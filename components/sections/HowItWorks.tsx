'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { whatsappLink } from '@/lib/site';

type StepCta = { label: string; message: string };

type Step = {
  num: string;
  eyebrow: string;
  title: string;
  copy: string;
  accent: 'cool' | 'sun';
  badge?: string;
  cta?: StepCta;
};

const steps: Step[] = [
  {
    num: '01',
    eyebrow: 'WhatsApp',
    title: 'Cuéntanos qué necesitas',
    copy: 'Mándanos un WhatsApp con la cantidad de equipos, la fecha y el lugar.',
    accent: 'cool',
    cta: {
      label: 'Abrir WhatsApp',
      message: 'Hola ClimaXpress, quiero cotizar la renta de un equipo',
    },
  },
  {
    num: '02',
    eyebrow: 'Cotización',
    title: 'Recibe tu cotización',
    copy: 'Te enviamos el precio. Si te late, lo apartamos — sin pedirte anticipo.',
    accent: 'sun',
    badge: 'Sin anticipo',
  },
  {
    num: '03',
    eyebrow: 'Día de entrega',
    title: 'Entrega y recolección',
    copy: 'Te avisamos por WhatsApp cuando vamos en camino a entregar y también a recoger. ¿Necesitas que pasen el mismo día? Solo dinos.',
    accent: 'cool',
  },
];

const gallery = [
  '/Como_funciona/IMG_5921.png',
  '/Como_funciona/IMG_5922.png',
  '/Como_funciona/IMG_5923.png',
];

type Slot = 'current' | 'prev' | 'next';

function slotFor(index: number, current: number, total: number): Slot | null {
  const diff = (index - current + total) % total;
  if (diff === 0) return 'current';
  if (diff === 1) return 'next';
  if (diff === total - 1) return 'prev';
  return null;
}

const slotClass: Record<Slot, string> = {
  current: 'z-20 translate-x-0 scale-100 opacity-100',
  prev: 'z-10 -translate-x-[62%] scale-[0.78] opacity-50 blur-[1px]',
  next: 'z-10 translate-x-[62%] scale-[0.78] opacity-50 blur-[1px]',
};

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = gallery.length;
  const goPrev = () => setCurrent((c) => (c - 1 + total) % total);
  const goNext = () => setCurrent((c) => (c + 1) % total);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    touchStartX.current = null;
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      gsap.from('[data-step-heading]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });

      gsap.from('[data-step-block]', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      });

      gsap.from('[data-gallery-heading]', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-gallery]', start: 'top 80%' },
      });

      gsap.from('[data-gallery-carousel]', {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-gallery]', start: 'top 75%' },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="como-funciona"
      aria-labelledby="how-title"
      className="relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_30%_20%,rgba(79,179,217,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(245,185,25,0.08)_0%,transparent_50%)]"
      />

      <Container className="relative z-10">
        <div data-step-heading className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
            Cómo funciona
          </p>
          <h2
            id="how-title"
            className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-brand-light via-white to-brand-sun bg-clip-text text-transparent">
              Tres pasos. Sin complicaciones.
            </span>
          </h2>
        </div>

        {/* Steps - editorial 3-column */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map(({ num, eyebrow, title, copy, accent, badge, cta }) => {
            const isSun = accent === 'sun';
            const numColor = isSun ? 'text-brand-sun/25' : 'text-white/10';
            const eyebrowColor = isSun ? 'text-brand-sun' : 'text-brand-light';
            const eyebrowBg = isSun
              ? 'bg-brand-sun/10 border-brand-sun/30'
              : 'bg-brand/10 border-brand-light/30';
            return (
              <div key={num} data-step-block className="relative">
                <span
                  className={`select-none font-mono text-7xl font-bold leading-none md:text-8xl ${numColor}`}
                  aria-hidden
                >
                  {num}
                </span>
                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${eyebrowColor} ${eyebrowBg}`}
                    >
                      {eyebrow}
                    </span>
                    {cta && (
                      <a
                        href={whatsappLink(cta.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-7 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_6px_18px_-6px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#1ebf5a]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                        {cta.label}
                      </a>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {copy}
                  </p>

                  {badge && (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand-sun/30 bg-brand-sun/10 px-3 py-1 text-xs font-semibold text-brand-sun">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery — carrusel de ejemplos reales */}
        <div data-gallery className="mt-24 md:mt-32">
          <div data-gallery-heading className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sun">
              Ejemplos reales
            </p>
            <h3 className="mt-3 text-balance text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Así se ve por WhatsApp
            </h3>
            <p className="mt-3 text-sm text-white/55">
              Capturas reales del proceso de renta con un cliente.
            </p>
          </div>

          <div
            data-gallery-carousel
            className="relative mx-auto mt-16 aspect-[1170/2532] w-[16rem] sm:w-[18rem] md:w-[20rem]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-brand-light/15 blur-3xl animate-glow"
            />

            <div
              className="absolute inset-0 touch-pan-y select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              role="group"
              aria-roledescription="carrusel"
              aria-label="Galería de capturas reales de WhatsApp"
            >
              {gallery.map((src, i) => {
                const slot = slotFor(i, current, total);
                if (!slot) return null;
                return (
                  <div
                    key={src}
                    aria-hidden={slot !== 'current'}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${slotClass[slot]}`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                      <Image
                        src={src}
                        alt={`Captura ${i + 1} de conversación de WhatsApp con ClimaXpress`}
                        fill
                        sizes="(max-width: 768px) 80vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-[-3rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-light/40 hover:bg-ink/80 md:flex"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Siguiente imagen"
              className="absolute right-[-3rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-light/40 hover:bg-ink/80 md:flex"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            <div
              className="absolute bottom-[-2.5rem] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2"
              role="tablist"
              aria-label="Selecciona imagen"
            >
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Ir a imagen ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-brand-light' : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
