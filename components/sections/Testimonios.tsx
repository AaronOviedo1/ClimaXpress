'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/ui/Container';

type Testimonial = {
  src: string;
  alt: string;
};

const all: Testimonial[] = [
  { src: '/testimonials/IMG_5915.jpg', alt: 'Mensaje de WhatsApp de un cliente sobre el servicio' },
  { src: '/testimonials/IMG_5917.jpg', alt: 'Mensaje de WhatsApp de un cliente recomendando ClimaXpress' },
  { src: '/testimonials/IMG_5918.jpg', alt: 'Mensaje de WhatsApp de un cliente felicitando la instalación' },
  { src: '/testimonials/IMG_5919.jpg', alt: 'Mensaje de WhatsApp de un cliente sobre la entrega puntual' },
  { src: '/testimonials/IMG_5920.jpg', alt: 'Mensaje de WhatsApp de un cliente con valoración positiva' },
];

const rowA: Testimonial[] = [all[0], all[1], all[2], all[3], all[4]];
const rowB: Testimonial[] = [all[4], all[2], all[0], all[3], all[1]];

// Tiny dark gradient blur placeholder (matches the WhatsApp screenshot aesthetic)
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDQiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzE1NTk0MyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBmMTQxOCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=';

function Card({ t, priority }: { t: Testimonial; priority?: boolean }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_25px_80px_-15px_rgba(79,179,217,0.25)]">
      <div className="relative h-[440px] w-[210px] sm:h-[500px] sm:w-[240px]">
        <Image
          src={t.src}
          alt={t.alt}
          fill
          sizes="(max-width: 640px) 210px, 240px"
          className="object-cover"
          quality={75}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
    </div>
  );
}

export function Testimonios() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      gsap.from('[data-test-heading]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_20%_30%,rgba(79,179,217,0.10)_0%,transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(245,185,25,0.10)_0%,transparent_55%)]"
      />

      <Container className="relative z-10">
        <div data-test-heading className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
            Testimonios
          </p>
          <h2
            id="testimonios-title"
            className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-brand-light via-white to-brand-sun bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </span>
          </h2>
          <p className="mt-5 text-base text-white/65">
            Mensajes reales de WhatsApp de gente que ya rentó con nosotros.
          </p>
        </div>
      </Container>

      <div className="relative mt-12 space-y-5 md:mt-16 md:space-y-6">
        <div className="group/marq overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee group-hover/marq:[animation-play-state:paused] sm:gap-6">
            {[...rowA, ...rowA].map((t, i) => (
              <Card key={`a-${i}`} t={t} priority={i < 3} />
            ))}
          </div>
        </div>

        <div className="group/marq overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee-reverse group-hover/marq:[animation-play-state:paused] sm:gap-6">
            {[...rowB, ...rowB].map((t, i) => (
              <Card key={`b-${i}`} t={t} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
