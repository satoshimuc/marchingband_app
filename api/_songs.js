// 共有データ（先頭の _ でVercelのルートから除外される）
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

module.exports = { SONGS };
