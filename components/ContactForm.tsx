'use client';
import { useState, type FormEvent } from 'react';
import { Arrow } from '@/components/Arrow';
import type { Locale, SiteCopy } from '@/content/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countryCodes = [
  { code: '+90', flag: '🇹🇷' },
  { code: '+966', flag: '🇸🇦' },
  { code: '+971', flag: '🇦🇪' },
  { code: '+965', flag: '🇰🇼' },
  { code: '+974', flag: '🇶🇦' },
  { code: '+973', flag: '🇧🇭' },
  { code: '+968', flag: '🇴🇲' },
  { code: '+20', flag: '🇪🇬' },
  { code: '+962', flag: '🇯🇴' },
  { code: '+961', flag: '🇱🇧' },
];

export function ContactForm({ locale, d }: { locale: Locale; d: SiteCopy }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return; // honeypot: bots fill hidden fields, humans never see this one

    const firstName = String(data.get('firstName') ?? '').trim();
    const lastName = String(data.get('lastName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phoneCode = String(data.get('phoneCode') ?? '').trim();
    const phoneNumber = String(data.get('phoneNumber') ?? '').trim();
    const phone = phoneNumber && phoneCode ? `${phoneCode} ${phoneNumber}` : phoneNumber;
    const message = String(data.get('message') ?? '').trim();

    if (!firstName || !lastName || !email || !phone || !message) { setStatus('error'); setError(d.formRequired); return; }
    if (!emailPattern.test(email)) { setStatus('error'); setError(d.formInvalidEmail); return; }

    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, message, locale }),
      });
      if (!res.ok) throw new Error('request-failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error'); setError(d.formErrorText);
    }
  }

  if (status === 'success') {
    return <div className="form-success"><h3>{d.formSuccessTitle}</h3><p>{d.formSuccessText}</p><button type="button" className="text-link" onClick={() => setStatus('idle')}>{d.formSendAnother}<Arrow/></button></div>;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div>
        <label>{d.form[0]}<input type="text" name="firstName" autoComplete="given-name" required /></label>
        <label>{d.form[1]}<input type="text" name="lastName" autoComplete="family-name" required /></label>
        <label>{d.form[2]}<input type="email" name="email" autoComplete="email" required /></label>
        <label>{d.form[3]}<span className="phone-field"><select name="phoneCode" aria-label={d.formPhoneCode} defaultValue="">
          <option value="">＋</option>
          {countryCodes.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select><input type="tel" name="phoneNumber" autoComplete="tel" required /></span></label>
      </div>
      <label className="form-message">{d.formMessage}<textarea name="message" rows={4} required /></label>
      {status === 'error' && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? d.formSending : d.send}<Arrow/></button>
    </form>
  );
}
