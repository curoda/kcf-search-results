// functions/docsbot.js
exports.handler = async (event) => {
  const { path, payload } = JSON.parse(event.body || '{}');   // path = '/chat' | '/search' | '/rate'

  // ①  add your real team‑ID here
  const TEAM_ID = 'xwIbVScaj0QaHNNbXE88';        // visible in the DocsBot dashboard URL
  const BOT_ID  = payload.botId;              // we still pass it from the frontend

  const allowed = ['/chat', '/search', '/rate'];
  if (!allowed.includes(path)) {
    return { statusCode: 400, body: 'Bad path' };
  }

  // ②  Build the proper DocsBot endpoint
  const target = `https://api.docsbot.ai/teams/${TEAM_ID}/bots/${BOT_ID}${path}`;

  const r = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DOCSBOT_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  return { statusCode: r.status, body: text };
};
