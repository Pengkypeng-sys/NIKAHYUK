const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();
const KEY = 'nikahyuk-data';

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const data = await redis.get(KEY);
    res.status(200).json(data || null);
    return;
  }
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body || '{}');
    await redis.set(KEY, body);
    res.status(200).json({ ok: true });
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
