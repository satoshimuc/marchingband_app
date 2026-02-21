const Anthropic = require('@anthropic-ai/sdk');
const { SONGS } = require('./_songs');

// Vercel: 最大60秒まで実行を許可
module.exports.config = { maxDuration: 60 };

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, songId } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: '名前を入力してください' });
  }
  if (!songId || !SONGS[songId]) {
    return res.status(400).json({ error: '応援歌を選択してください' });
  }

  const song = SONGS[songId];
  const client = new Anthropic();

  // SSE ストリーミング設定
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      thinking: { type: 'adaptive' },
      system: `あなたは甲子園の伝説的な応援団長です。選手のために魂を込めた応援歌の歌詞を作ります。

応援歌の特徴：
- 選手の名前「${name}」を何度も呼ぶ（「${name}！」「行け！${name}！」「${name}ファイト！」など）
- 甲子園の熱い雰囲気を再現する
- リズミカルで覚えやすく、実際に叫べる
- コール＆レスポンスのパート（「オーイェー！」「ファイト！」「ウォー！」など）を含む
- 日本語で書く（一部英語の掛け声もOK）
- 各パートをラベル付きで整理する（例：【イントロ】【Aパート】【サビ】【コール&レスポンス】など）
- 実際に声に出して応援できる形にする
- 絵文字や記号で盛り上がりを表現してOK（⚾🔥💪 など）

曲の雰囲気：${song.rhythm_hint}`,
      messages: [
        {
          role: 'user',
          content: `「${song.name}」（${song.composer}）の曲に合わせて、「${name}」さんのための甲子園応援歌を作ってください！

この曲の特徴：${song.description}
リズムのヒント：${song.rhythm_hint}

「${name}」という名前をたくさん使って、甲子園スタンドが一体となって盛り上がれる、熱くて最高の応援歌をお願いします！⚾🔥`,
        },
      ],
    });

    for await (const text of stream.text_stream) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Claude API error:', error);
    res.write(`data: ${JSON.stringify({ error: 'エラーが発生しました。もう一度お試しください。' })}\n\n`);
    res.end();
  }
};
