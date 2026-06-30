// netlify/functions/send-email.js
// Sends transactional emails via Resend
// SECURITY: key comes ONLY from environment variable. No fallback value — ever.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Resend not configured. Set RESEND_API_KEY in Netlify Environment Variables.' })
    };
  }

  try {
    const { to, subject, html, from = 'SAMPACE INSTITUTE <noreply@sampacecampus.com.ng>' } = JSON.parse(event.body);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, id: data.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message }),
    };
  }
};
