import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/site';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-8 md:right-8 md:inline-flex md:h-16 md:w-16"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </a>
  );
}
