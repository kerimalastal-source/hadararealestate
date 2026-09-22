'use client';
import { useRef, useState, type FormEvent } from 'react';
import { Arrow } from '@/components/Arrow';
import { countryCodes, flagEmoji, priorityIso2 } from '@/content/countryCodes';
import type { Locale, SiteCopy } from '@/content/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const priorityCountries = priorityIso2.map(iso2 => countryCodes.find(c => c.iso2 === iso2)!);

type FieldName = 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'message';
const fieldOrder: FieldName[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'message'];

export function ContactForm({ locale, d }: { locale: Locale; d: SiteCopy }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, string>>>({});
  const refs = {
    firstName: useRef<HTMLInputElement>(null), lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null), phoneNumber: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const clear = (name: FieldName) => setInvalid(prev => (prev[name] ? { ...prev, [name]: undefined } : prev));

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

    const fieldErrors: Partial<Record<FieldName, string>> = {};
    if (!firstName) fieldErrors.firstName = d.formFieldRequired;
    if (!lastName) fieldErrors.lastName = d.formFieldRequired;
    if (!email) fieldErrors.email = d.formFieldRequired;
    else if (!emailPattern.test(email)) fieldErrors.email = d.formInvalidEmail;
    if (!phoneNumber) fieldErrors.phoneNumber = d.formFieldRequired;
    if (!message) fieldErrors.message = d.formFieldRequired;

    if (Object.keys(fieldErrors).length) {
      setInvalid(fieldErrors);
      setStatus('error'); setError(d.formRequired);
      refs[fieldOrder.find(k => fieldErrors[k])!].current?.focus();
      return;
    }

    setInvalid({});
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
        <label>{d.form[0]}<span className="req">*</span><input ref={refs.firstName} type="text" name="firstName" autoComplete="given-name" required aria-invalid={!!invalid.firstName} className={invalid.firstName ? 'invalid' : undefined} onChange={() => clear('firstName')} />{invalid.firstName && <span className="field-error">{invalid.firstName}</span>}</label>
        <label>{d.form[1]}<span className="req">*</span><input ref={refs.lastName} type="text" name="lastName" autoComplete="family-name" required aria-invalid={!!invalid.lastName} className={invalid.lastName ? 'invalid' : undefined} onChange={() => clear('lastName')} />{invalid.lastName && <span className="field-error">{invalid.lastName}</span>}</label>
        <label>{d.form[2]}<span className="req">*</span><input ref={refs.email} type="email" name="email" autoComplete="email" required aria-invalid={!!invalid.email} className={invalid.email ? 'invalid' : undefined} onChange={() => clear('email')} />{invalid.email && <span className="field-error">{invalid.email}</span>}</label>
        <label>{d.form[3]}<span className="req">*</span><span className="phone-field"><select name="phoneCode" aria-label={d.formPhoneCode} defaultValue="">
          <option value="">＋</option>
          <optgroup label={d.countryPriorityLabel}>{priorityCountries.map(c => <option key={`p-${c.iso2}`} value={c.dial}>{flagEmoji(c.iso2)} {c.dial} {c.name}</option>)}</optgroup>
          <optgroup label={d.countryAllLabel}>{countryCodes.map(c => <option key={c.iso2} value={c.dial}>{flagEmoji(c.iso2)} {c.dial} {c.name}</option>)}</optgroup>
        </select><input ref={refs.phoneNumber} type="tel" name="phoneNumber" autoComplete="tel" required aria-invalid={!!invalid.phoneNumber} className={invalid.phoneNumber ? 'invalid' : undefined} onChange={() => clear('phoneNumber')} /></span>{invalid.phoneNumber && <span className="field-error">{invalid.phoneNumber}</span>}</label>
      </div>
      <label className="form-message">{d.formMessage}<span className="req">*</span><textarea ref={refs.message} name="message" rows={4} required aria-invalid={!!invalid.message} className={invalid.message ? 'invalid' : undefined} onChange={() => clear('message')} />{invalid.message && <span className="field-error">{invalid.message}</span>}</label>
      {status === 'error' && <p className="form-error" role="alert">{error}</p>}
      <p className="form-note">{d.formRequiredNote}</p>
      <button type="submit" disabled={status === 'sending'}><span className="btn-label">{status === 'sending' && <span className="spinner" aria-hidden="true"/>}{status === 'sending' ? d.formSending : d.send}</span><Arrow/></button>
    </form>
  );
}
