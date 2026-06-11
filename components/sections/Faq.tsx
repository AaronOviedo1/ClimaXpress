import { ChevronDown, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { faqs } from '@/lib/faqs';
import { whatsappLink } from '@/lib/site';

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-ink py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_80%_20%,rgba(79,179,217,0.10)_0%,transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(245,185,25,0.10)_0%,transparent_55%)]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-title"
            className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-brand-light via-white to-brand-sun bg-clip-text text-transparent">
              Renta de aerocoolers y calentones en Hermosillo
            </span>
          </h2>
          <p className="mt-5 text-base text-white/65">
            Lo que más nos preguntan sobre precios, entrega e instalación.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-16">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 open:border-brand-light/30 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5 sm:text-lg">
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 flex-none text-brand-light transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-white/65 sm:px-6 sm:pb-6 sm:text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm text-white/55">
            ¿Tienes otra pregunta? Escríbenos y te respondemos al momento.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebf5a]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Preguntar por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
