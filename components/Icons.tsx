const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const IconPin = () => <svg {...base}><path d="M12 21s-7-6.3-7-11.5A7 7 0 0 1 19 9.5C19 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>;
export const IconPhone = () => <svg {...base}><path d="M4.5 4h3.2l1.4 4.2-2 1.6a12.5 12.5 0 0 0 5.1 5.1l1.6-2 4.2 1.4v3.2c0 1-.9 1.8-1.9 1.6C9.6 18.1 5.9 14.4 4.9 8.9 4.7 7.9 5.5 6 6.5 6Z"/></svg>;
export const IconWhatsapp = () => <svg {...base} strokeWidth={1.2}><path d="M6.5 17.5 5 21l3.6-1.4A8.5 8.5 0 1 0 5.5 15Z"/><path d="M8.8 9.4c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .6.5s.7 1.7.7 1.8.1.3 0 .5-.2.3-.4.5-.4.4-.2.7c.2.3.9 1.4 1.9 2.2 1.3 1.1 1.9 1.1 2.2 1 .3-.1.7-.7.9-.9.2-.3.4-.2.6-.1s1.5.7 1.8.8.5.2.5.4-.1 1-.5 1.4-1.3.9-2.3.7c-1.1-.2-3.2-1.2-4.5-2.9-1.2-1.5-1.9-2.9-1.9-4.1 0-.6.2-1.1.5-1.5Z" fill="currentColor" stroke="none"/></svg>;
export const IconMail = () => <svg {...base}><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>;
export const IconClock = () => <svg {...base}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>;

export const IconSearch = () => <svg {...base}><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>;
