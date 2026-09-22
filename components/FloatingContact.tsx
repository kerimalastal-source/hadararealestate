import { business } from '@/content/business';
import { IconPhone, IconWhatsapp } from '@/components/Icons';
import type { SiteCopy } from '@/content/site';

export function FloatingContact({ d }: { d: SiteCopy }) {
  const whatsappHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(d.whatsappMessage)}`;
  return (
    <div className="floating-contact">
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={d.floatingWhatsappLabel} className="floating-btn whatsapp"><IconWhatsapp/></a>
      <a href={business.phoneHref} aria-label={d.floatingCallLabel} className="floating-btn call"><IconPhone/></a>
    </div>
  );
}
