// ============================================================
// CLOUDFLARE PAGES FUNCTION — Send email via Resend
// Endpoint: POST /api/send-email
// ============================================================

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json()
    const { type, to, name, subject, html } = body

    if (!to) {
      return new Response(JSON.stringify({ error: 'Missing "to" field' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const apiKey = env.RESEND_API_KEY
    const fromEmail = env.RESEND_FROM_EMAIL || 'SAMPACE <hello@sampaceedu.com.ng>'

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Build email based on type
    let finalSubject = subject
    let finalHtml = html

    if (type === 'welcome') {
      finalSubject = `Welcome to SAMPACE, ${name || 'Friend'}! 🎓`
      finalHtml = buildWelcomeEmail(name)
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: finalSubject,
        html: finalHtml
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

function buildWelcomeEmail(name) {
  const firstName = (name || 'Friend').split(' ')[0]
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to SAMPACE</title>
</head>
<body style="margin:0;padding:0;background:#0A1F44;font-family:Inter,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1F44;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#0d2a5c;border-radius:16px;overflow:hidden;border:1px solid rgba(201,162,39,0.2);">
          <tr>
            <td style="padding:40px 40px 20px;text-align:center;">
              <div style="font-family:Georgia,serif;font-size:28px;font-weight:800;color:#E5C158;letter-spacing:1px;">SAMPACE</div>
              <div style="font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.6);margin-top:4px;">EDUCATIONAL LTD</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 40px;color:#fff;">
              <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:800;margin:0 0 16px;line-height:1.2;color:#fff;">
                Welcome, ${firstName}! 🎓
              </h1>
              <p style="font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);margin:0 0 20px;">
                Your SAMPACE account is now active. You've joined a community of over 12,000 learners across Nigeria.
              </p>
              <p style="font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);margin:0 0 24px;">
                Here's what you can do right now:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 0;color:rgba(255,255,255,0.85);font-size:14px;">📚 Explore 400+ courses across 13 schools</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:rgba(255,255,255,0.85);font-size:14px;">🎯 Take the free JAMB readiness test</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:rgba(255,255,255,0.85);font-size:14px;">📝 Apply to any programme</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:rgba(255,255,255,0.85);font-size:14px;">💬 Join our WhatsApp learner community</td>
                </tr>
              </table>
              <div style="text-align:center;margin:32px 0;">
                <a href="https://sampaceedu.com.ng/dashboard" style="display:inline-block;background:linear-gradient(135deg,#E5C158,#C9A227);color:#0A1F44;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;">
                  Go to My Dashboard →
                </a>
              </div>
              <p style="font-size:13px;line-height:1.7;color:rgba(255,255,255,0.5);margin:32px 0 0;border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
                Questions? Reply to this email or WhatsApp us at +234 708 216 6496.<br>
                SAMPACE EDUCATIONAL LTD · RC: 9677766
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
