const { SONGS } = require('./_songs');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const songs = Object.entries(SONGS).map(([id, info]) => ({
    id,
    name: info.name,
    composer: info.composer,
    description: info.description,
  }));

  res.json(songs);
};
