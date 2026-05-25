'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ChevronLeft,
  ChevronRight,
  Disc,
  Flame,
  Layers,
  Maximize2,
  MessageCircle,
  MoveVertical,
  Package,
  Ruler,
  Tag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { whatsappLink } from '@/lib/site';

type Spec = { label: string; value: string; icon: LucideIcon };

type GalleryImage = { src: string; rotate?: boolean };

type Model = {
  id: 'cafe-obscuro' | 'gris-claro' | 'cafe-gratinado';
  name: string;
  tagline: string;
  startIndex: number;
  specs: Spec[];
};

// Galería unificada — el tab solo cambia el índice inicial.
const gallery: GalleryImage[] = [
  { src: '/products/calentones/cal-01.JPG' },
  { src: '/products/calentones/04.jpg' },
  { src: '/products/calentones/06.jpg' },
  { src: '/products/calentones/02.JPG' },
  { src: '/products/calentones/03.JPG' },
  { src: '/products/calentones/05.png' },
];

const sharedSpecs: Pick<Spec, 'label' | 'value' | 'icon'>[] = [
  { label: 'Área que calienta', value: '20 – 30 m²', icon: Maximize2 },
  { label: 'Casco Ø', value: '76 – 88 cm', icon: Disc },
  { label: 'Base Ø', value: '45 – 50 cm', icon: Ruler },
];

const models: Model[] = [
  {
    id: 'cafe-obscuro',
    name: 'Café Obscuro',
    tagline: 'Fire Sense en acero con acabado café oscuro.',
    startIndex: 0,
    specs: [
      { label: 'Marca', value: 'Fire Sense', icon: Tag },
      ...sharedSpecs,
      { label: 'Altura', value: '232 cm', icon: MoveVertical },
      { label: 'Material', value: 'Acero', icon: Layers },
      { label: 'Peso (sin gas)', value: '16.7 kg', icon: Package },
    ],
  },
  {
    id: 'gris-claro',
    name: 'Gris Claro',
    tagline: 'Fire Sense en acero con acabado gris claro.',
    startIndex: 1,
    specs: [
      { label: 'Marca', value: 'Fire Sense', icon: Tag },
      ...sharedSpecs,
      { label: 'Altura', value: '232 cm', icon: MoveVertical },
      { label: 'Material', value: 'Acero', icon: Layers },
      { label: 'Peso (sin gas)', value: '16.7 kg', icon: Package },
    ],
  },
  {
    id: 'cafe-gratinado',
    name: 'Café Gratinado',
    tagline: 'Estufa en metal con acabado café gratinado.',
    startIndex: 2,
    specs: [
      { label: 'Marca', value: 'N/A', icon: Tag },
      ...sharedSpecs,
      { label: 'Altura', value: '1.7 – 2 m', icon: MoveVertical },
      { label: 'Material', value: 'Metal', icon: Layers },
      { label: 'Peso (sin gas)', value: '22 kg', icon: Package },
    ],
  },
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

export function CalentonesShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [selectedModel, setSelectedModel] = useState(0);
  const [current, setCurrent] = useState(models[0].startIndex);
  const touchStartX = useRef<number | null>(null);

  const model = models[selectedModel];
  const total = gallery.length;

  const goPrev = () => setCurrent((c) => (c - 1 + total) % total);
  const goNext = () => setCurrent((c) => (c + 1) % total);

  const selectModel = (i: number) => {
    if (i === selectedModel) return;
    setSelectedModel(i);
    setCurrent(models[i].startIndex);
  };

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

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=120%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          '[data-warm-bg]',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0
        )
          .fromTo(
            '[data-warm-product]',
            { xPercent: 60, opacity: 0, rotate: -8 },
            { xPercent: 0, opacity: 1, rotate: 0, duration: 1.2 },
            0
          )
          .fromTo(
            '[data-warm-eyebrow]',
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 },
            0.3
          )
          .fromTo(
            '[data-warm-title]',
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 },
            0.4
          )
          .fromTo(
            '[data-warm-copy]',
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 },
            0.6
          )
          .fromTo(
            '[data-warm-tabs]',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            0.75
          )
          .fromTo(
            '[data-warm-spec]',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            0.85
          )
          .fromTo(
            '[data-warm-cta]',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            1.2
          );
      });

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '[data-warm-product]',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: { trigger: root, start: 'top 70%' },
          }
        );
        gsap.fromTo(
          '[data-warm-text] > *, [data-warm-cta]',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: root, start: 'top 60%' },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="calentones"
      aria-labelledby="cal-title"
      className="relative min-h-screen overflow-hidden bg-ink"
    >
      <div
        data-warm-bg
        aria-hidden
        className="absolute inset-0 bg-warm-gradient"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_50%_50%,rgba(245,185,25,0.16)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-sun/25 blur-3xl animate-drift-slow"
      />

      <Container className="relative z-10 grid min-h-screen items-center gap-10 py-24 md:grid-cols-2 md:gap-12 md:py-0">
        <div data-warm-text className="md:col-start-1 md:row-start-1">
          <div
            data-warm-eyebrow
            className="inline-flex items-center gap-2 rounded-full border border-brand-sun/30 bg-brand-sun/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-sun"
          >
            <Flame className="h-3.5 w-3.5" aria-hidden />
            02 — Calor
          </div>
          <h2
            id="cal-title"
            data-warm-title
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-brand-sun to-[#f08018] bg-clip-text text-transparent">
              Calentones
            </span>
          </h2>
          <p
            data-warm-copy
            className="mt-6 max-w-md text-balance text-lg text-white/70"
          >
            Estufas de patio a gas. Calor radiante para terrazas, jardines y
            eventos al aire libre — llegamos con todo y los dejamos listos para
            encender.
          </p>

          {/* Tabs */}
          <div
            data-warm-tabs
            role="tablist"
            aria-label="Selecciona modelo de calentón"
            className="mt-6 inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
          >
            {models.map((m, i) => {
              const active = i === selectedModel;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectModel(i)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-brand-sun text-ink shadow-[0_4px_16px_-4px_rgba(245,185,25,0.6)]'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-white/55">{model.tagline}</p>

          {/* Specs grid */}
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
            {model.specs.map(({ label, value, icon: Icon }) => (
              <li
                key={`${model.id}-${label}`}
                data-warm-spec
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-sun/15 text-brand-sun">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-warm-product
          className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96 md:col-start-2 md:row-span-2 md:row-start-1 md:h-[36rem] md:w-[36rem]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-brand-sun/40 blur-3xl animate-glow"
          />

          <div
            className="absolute inset-0 touch-pan-y select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="group"
            aria-roledescription="carrusel"
            aria-label={`Galería de calentones — ${model.name}`}
          >
            {gallery.map((img, i) => {
              const slot = slotFor(i, current, total);
              if (!slot) return null;
              return (
                <div
                  key={img.src}
                  aria-hidden={slot !== 'current'}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${slotClass[slot]}`}
                >
                  <div className={slot === 'current' ? 'absolute inset-0 animate-float-slow' : 'absolute inset-0'}>
                    <Image
                      src={img.src}
                      alt={`Calentón ${i + 1} de ClimaXpress`}
                      fill
                      sizes="(max-width: 768px) 80vw, 40vw"
                      className={`rounded-3xl object-contain drop-shadow-[0_30px_60px_rgba(245,185,25,0.4)] ${img.rotate ? 'rotate-90' : ''}`}
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
            className="absolute left-[-1rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-sun/40 hover:bg-ink/80 md:flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente imagen"
            className="absolute right-[-1rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-sun/40 hover:bg-ink/80 md:flex"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>

          <div
            className="absolute bottom-[-2rem] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2"
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
                  i === current ? 'w-8 bg-brand-sun' : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div data-warm-cta className="md:col-start-1 md:row-start-2 md:mt-0 mt-4">
          <a
            href={whatsappLink(
              `Hola ClimaXpress, me interesa rentar un calentón ${model.name}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-sun px-7 text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,185,25,0.7)] transition-all duration-300 hover:scale-[1.03]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Cotizar {model.name}
          </a>
        </div>
      </Container>
    </section>
  );
}
