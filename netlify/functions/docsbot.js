// netlify/functions/docsbot.js
exports.handler = async (event) => {
  // Parse body { path: '/chat', payload: {...} }
  const { path, payload } = JSON.parse(event.body || '{}');

  const allowed = ['/chat', '/search', '/rate'];
  if (!allowed.includes(path)) {
    return { statusCode: 400, body: 'Bad path' };
  }

  const r = await fetch(`https://api.docsbot.ai${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DOCSBOT_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  return { statusCode: r.status, body: text };
};
