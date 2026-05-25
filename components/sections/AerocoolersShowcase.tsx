'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Maximize2,
  MessageCircle,
  Package,
  Plug,
  Ruler,
  Volume2,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { whatsappLink } from '@/lib/site';

type Spec = { label: string; value: string; icon: LucideIcon };

type GalleryImage = { src: string; rotate?: boolean };

type Model = {
  id: 'eco' | 'turbo';
  name: string;
  tagline: string;
  startIndex: number;
  pricePerDay: number;
  specs: Spec[];
};

// Galería unificada — el tab solo cambia el índice inicial.
const gallery: GalleryImage[] = [
  { src: '/products/aerocoolers/ECO_FRESCO.png' },
  { src: '/products/aerocoolers/IMG_4064.png', rotate: true },
  { src: '/products/aerocoolers/TURBO_FRIO.png' },
  { src: '/products/aerocoolers/IMG_1038.jpeg' },
  { src: '/products/aerocoolers/ecoyturbo01.png', rotate: true },
  { src: '/products/aerocoolers/ecoyturbo02.png', rotate: true },
  { src: '/products/aerocoolers/ecoyturbo03.png', rotate: true },
  { src: '/products/aerocoolers/turbo01.png', rotate: true },
  { src: '/products/aerocoolers/IMG_1251.jpeg', rotate: true },
];

const models: Model[] = [
  {
    id: 'eco',
    name: 'Eco-Fresco',
    tagline: 'Compacto y eficiente para espacios medianos.',
    startIndex: 0,
    pricePerDay: 450,
    specs: [
      { label: 'Flujo de aire', value: '3,600 CFM', icon: Wind },
      { label: 'Área', value: '35 – 40 m²', icon: Maximize2 },
      { label: 'Capacidad', value: '40 L', icon: Droplets },
      { label: 'Peso', value: '18 kg', icon: Package },
      { label: 'Dimensiones', value: '95 × 61 × 41 cm', icon: Ruler },
      { label: 'Voltaje', value: '127 V / 60 Hz', icon: Plug },
    ],
  },
  {
    id: 'turbo',
    name: 'Turbo-Frío',
    tagline: 'Mayor flujo y cobertura para espacios grandes.',
    startIndex: 2,
    pricePerDay: 650,
    specs: [
      { label: 'Flujo de aire', value: '5,300 CFM', icon: Wind },
      { label: 'Área', value: '70 m²', icon: Maximize2 },
      { label: 'Capacidad', value: '55 L', icon: Droplets },
      { label: 'Peso', value: '38 kg', icon: Package },
      { label: 'Ruido', value: '60 dB (A)', icon: Volume2 },
      { label: 'Dimensiones', value: '138 × 87 × 48 cm', icon: Ruler },
      { label: 'Voltaje', value: '127 V / 60 Hz', icon: Plug },
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

export function AerocoolersShowcase() {
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
          '[data-cool-bg]',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0
        )
          .fromTo(
            '[data-cool-product]',
            { xPercent: 60, opacity: 0, rotate: -8 },
            { xPercent: 0, opacity: 1, rotate: 0, duration: 1.2 },
            0
          )
          .fromTo(
            '[data-cool-title]',
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 },
            0.4
          )
          .fromTo(
            '[data-cool-copy]',
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 },
            0.6
          )
          .fromTo(
            '[data-cool-tabs]',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            0.75
          )
          .fromTo(
            '[data-cool-price]',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            0.82
          )
          .fromTo(
            '[data-cool-spec]',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            0.85
          )
          .fromTo(
            '[data-cool-cta]',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            1.2
          );
      });

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '[data-cool-product]',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: { trigger: root, start: 'top 70%' },
          }
        );
        gsap.fromTo(
          '[data-cool-text] > *, [data-cool-cta]',
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
      id="aerocoolers"
      aria-labelledby="aero-title"
      className="relative min-h-screen overflow-hidden bg-ink"
    >
      <div
        data-cool-bg
        aria-hidden
        className="absolute inset-0 bg-cold-gradient"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_50%_50%,rgba(79,179,217,0.18)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-light/20 blur-3xl animate-drift-slow"
      />

      <Container className="relative z-10 grid min-h-screen items-center gap-10 pt-24 pb-12 md:grid-cols-2 md:gap-12 md:pt-28 md:pb-0">
        <div data-cool-text className="md:col-start-1 md:row-start-1">
          <h2
            id="aero-title"
            data-cool-title
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">
              Aerocoolers
            </span>
          </h2>
          <p
            data-cool-copy
            className="mt-6 max-w-md text-balance text-lg text-white/70"
          >
            Lo llevamos a domicilio, instalamos y recogemos, tu renta incluye mangueras y extensiones.
          </p>

          {/* Tabs */}
          <div
            data-cool-tabs
            role="tablist"
            aria-label="Selecciona modelo de aerocooler"
            className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
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
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-brand-light text-ink shadow-[0_4px_16px_-4px_rgba(79,179,217,0.6)]'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-white/55">{model.tagline}</p>

          {/* Precio */}
          <div data-cool-price className="mt-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
              <span className="text-brand-light">Renta</span>
              <span className="text-white/45"> · + servicio a domicilio</span>
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                ${model.pricePerDay.toLocaleString('es-MX')}
              </span>
              <span className="text-sm text-white/60">/ día</span>
            </div>
          </div>

          {/* Specs grid */}
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
            {model.specs.map(({ label, value, icon: Icon }) => (
              <li
                key={`${model.id}-${label}`}
                data-cool-spec
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-light/15 text-brand-light">
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
          data-cool-product
          className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96 md:col-start-2 md:row-span-2 md:row-start-1 md:h-[26rem] md:w-[26rem] lg:h-[30rem] lg:w-[30rem]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-brand-light/30 blur-3xl animate-glow"
          />

          <div
            className="absolute inset-0 touch-pan-y select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="group"
            aria-roledescription="carrusel"
            aria-label={`Galería de aerocoolers — ${model.name}`}
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
                      alt={`Aerocooler ${i + 1} de ClimaXpress`}
                      fill
                      sizes="(max-width: 768px) 80vw, 40vw"
                      className={`object-contain drop-shadow-[0_30px_60px_rgba(79,179,217,0.4)] ${img.rotate ? 'rotate-90' : ''}`}
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
            className="absolute left-[-1rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-light/40 hover:bg-ink/80 md:flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente imagen"
            className="absolute right-[-1rem] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-light/40 hover:bg-ink/80 md:flex"
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
                  i === current ? 'w-8 bg-brand-light' : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div data-cool-cta className="mt-4 flex justify-center md:col-start-1 md:row-start-2 md:mt-0">
          <a
            href={whatsappLink(
              `Hola ClimaXpress, me interesa rentar un aerocooler ${model.name}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#1ebf5a]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Cotizar {model.name}
          </a>
        </div>
      </Container>
    </section>
  );
}
