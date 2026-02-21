const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
const client = new Anthropic();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const SONGS = {
  african_symphony: {
    name: 'アフリカンシンフォニー',
    composer: 'Van McCoy',
    description: '甲子園で最も有名な応援曲。力強くリズミカルなブラスサウンド。',
    rhythm_hint: '「ヤッター ヤッター ヤ！」のような短くパワフルなコール。8ビートで刻む元気なリズム。',
  },
  nerai_uchi: {
    name: '狙いうち',
    composer: '山本リンダ',
    description: 'ウラ拍が特徴的な定番応援歌。スタンドが一体になる名曲。',
    rhythm_hint: '「ウン・ター・ター！ウン・ター・ター！」のウラ拍リズム。コミカルで元気な雰囲気。',
  },
  limelight: {
    name: 'ライムライト',
    composer: 'Rush',
    description: 'ロック調の熱い応援歌。スタジアムが沸き立つ名曲。',
    rhythm_hint: '「ドーン！ドドドン！ドン！」の力強いドラムビート。ロック魂溢れる熱い応援。',
  },
  touch: {
    name: 'タッチ',
    composer: '岩崎良美',
    description: 'さわやかで親しみやすいポップな応援歌。老若男女に人気。',
    rhythm_hint: '明るくポップなメロディに乗せた応援。「タッチ！タッチ！」の呼びかけ。',
  },
  jock_rock: {
    name: 'ジョックロック',
    composer: 'Harry Gregson-Williams',
    description: 'アップテンポで盛り上がる応援曲。スタンドが躍動する。',
    rhythm_hint: '「オーオーオー！」の掛け声。リズミカルで体が自然と動く元気なビート。',
  },
  yamato: {
    name: '宇宙戦艦ヤマト',
    composer: '宮川泰',
    description: '壮大で熱い応援歌。まさに戦いに挑む魂を燃やす名曲。',
    rhythm_hint: '「さーらば！地球よ！」の壮大なスケール。ドラマチックで熱い応援。',
  },
  galaxy_express: {
    name: '銀河鉄道999',
    composer: '高木宏幸',
    description: 'ドラマチックで壮大な応援歌。夢と希望を乗せて走る。',
    rhythm_hint: '「さーあー行くんだ！」の力強い前進感。夢を追う若者への熱いエール。',
  },
  cumbanchero: {
    name: 'エル・クンバンチェロ',
    composer: 'Rafael Hernández Marín',
    description: 'ラテンのリズムが熱狂的な雰囲気を作り出す応援曲。',
    rhythm_hint: '「タン タ タ タン！」のラテンリズム。情熱的で踊り出したくなるリズム。',
  },
  we_will_rock_you: {
    name: 'We Will Rock You',
    composer: 'Queen',
    description: 'ドン・ドン・パンのリズムが全員を一体化させる世界的応援歌。',
    rhythm_hint: '「ドン！ドン！パン！」の超シンプルで強烈なビート。「○○！ガンバレ！」の絶叫。',
  },
  fuke_yo_kaze: {
    name: '吹けよ風、呼べよ嵐',
    composer: '山口洋子・平尾昌晃',
    description: '甲子園の定番中の定番。魂を揺さぶる熱い応援歌。',
    rhythm_hint: '「吹けよ！風よ！」の魂の叫び。青春と汗と涙の甲子園らしい熱さ。',
  },
};

app.get('/api/songs', (req, res) => {
  const songs = Object.entries(SONGS).map(([id, info]) => ({
    id,
    name: info.name,
    composer: info.composer,
    description: info.description,
  }));
  res.json(songs);
});

app.post('/api/generate', async (req, res) => {
  const { name, songId } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: '名前を入力してください' });
  }
  if (!songId || !SONGS[songId]) {
    return res.status(400).json({ error: '応援歌を選択してください' });
  }

  const song = SONGS[songId];

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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`⚾ 甲子園応援歌ジェネレーター起動！`);
  console.log(`🎺 http://localhost:${PORT}`);
});
