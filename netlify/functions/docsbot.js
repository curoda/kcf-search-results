// functions/docsbot.js
// Node 18 runtime on Netlify already includes fetch; no import needed.

const TEAM_ID = 'xwIbVScaj0QaHNNbXE88';          // ← your real DocsBot team-ID
const BOT_ID  = 'Fexkxwkxg677RTx6Z0WN';          // bot you gave earlier

exports.handler = async (event) => {
  try {
    const { path, payload } = JSON.parse(event.body || '{}'); // path: '/chat' | '/search' | '/rate'

    // allow-list basic routes
    const allowed = ['/chat', '/search', '/rate'];
    if (!allowed.includes(path)) {
      return { statusCode: 400, body: 'Bad path' };
    }

    // build the DocsBot endpoint
    const target = `https://api.docsbot.ai/teams/${TEAM_ID}/bots/${BOT_ID}${path}`;

    // forward the call with your secret key
    const r = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Netlify injects the secret defined as DOCSBOT_API_KEY
        'Authorization': `Bearer ${process.env.DOCSBOT_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
    return { statusCode: r.status, body: text };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.toString() };
  }
};

