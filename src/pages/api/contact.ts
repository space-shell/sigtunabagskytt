/**
 * Contact form handler — POST /api/contact
 * Validates Cloudflare Turnstile token and sends email via Mailchannels.
 * Runs as a Cloudflare Worker.
 */
export const prerender = false;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json() as ContactFormData;
    const { name, email, subject, message, turnstileToken } = data;

    // ── Validate required fields ─────────────────────────────────────────────
    if (!name || !email || !message || !turnstileToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'Obligatoriska fält saknas.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Ogiltig e-postadress.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── Verify Cloudflare Turnstile token ────────────────────────────────────
    const turnstileSecret = (request as unknown as { cf?: Record<string, unknown> & { env?: { TURNSTILE_SECRET_KEY?: string } } }).cf?.env?.TURNSTILE_SECRET_KEY
      ?? process.env.TURNSTILE_SECRET_KEY;

    if (turnstileSecret) {
      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: request.headers.get('CF-Connecting-IP'),
          }),
        }
      );

      const verifyResult = await verifyResponse.json() as { success: boolean };

      if (!verifyResult.success) {
        return new Response(
          JSON.stringify({ success: false, error: 'Verifiering misslyckades. Försök igen.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // ── Send email via Mailchannels ──────────────────────────────────────────
    const toEmail = process.env.CONTACT_EMAIL ?? 'sigtunabagskytte@gmail.com';

    const emailPayload = {
      personalizations: [
        {
          to: [{ email: toEmail, name: 'Sigtuna Bågskytteklubb' }],
          reply_to: { email, name },
        },
      ],
      from: {
        email: 'noreply@sigtunabagskytte.se',
        name: 'Sigtuna Bågskytteklubb – Kontaktformulär',
      },
      subject: `Kontaktformulär: ${subject || 'Ny förfrågan'}`,
      content: [
        {
          type: 'text/plain',
          value: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
        },
        {
          type: 'text/html',
          value: `
            <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-post:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <hr>
            <p><strong>Meddelande:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          `,
        },
      ],
    };

    const sendResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    });

    if (!sendResponse.ok && sendResponse.status !== 202) {
      console.error('Mailchannels error:', sendResponse.status, await sendResponse.text());
      return new Response(
        JSON.stringify({ success: false, error: 'Kunde inte skicka e-post. Försök igen senare.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Ett oväntat fel inträffade.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
