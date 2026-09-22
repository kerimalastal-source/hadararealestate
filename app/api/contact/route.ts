import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 2000;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. A filled value means a bot — report success without sending.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 5) : 'en';

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing-fields' }, { status: 400 });
  }
  if (!emailPattern.test(email) || [firstName, lastName, phone, email, message].some(v => v.length > MAX_LENGTH)) {
    return NextResponse.json({ ok: false, error: 'invalid-input' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error('Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL in the project environment variables.');
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || 'HADARA Website <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry from ${firstName} ${lastName} — HADARA website`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : '—'}</p>
        <p><strong>Site language:</strong> ${escapeHtml(locale)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });
    if (error) {
      console.error('Resend rejected the message', error);
      return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('Contact form send failed', err);
    return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
