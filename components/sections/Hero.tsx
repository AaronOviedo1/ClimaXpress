'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, MessageCircle, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import { whatsappLink } from '@/lib/site';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('[data-hero-eyebrow]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo('[data-hero-logo]',
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo('[data-hero-title] > span',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
            '-=0.5'
          )
          .fromTo('[data-hero-sub]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
          .fromTo('[data-hero-cta] > *',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
            '-=0.4'
          )
          .fromTo('[data-hero-trust]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')
          .fromTo('[data-hero-stats]',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.5'
          )
          .fromTo('[data-hero-product]',
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
            '-=1.8'
          )
          .add(() => {
            const counters = root.querySelectorAll<HTMLElement>('[data-stat-num]');
            counters.forEach((el) => {
              const target = Number(el.dataset.target ?? '0');
              const suffix = el.dataset.suffix ?? '';
              const decimals = Number(el.dataset.decimals ?? '0');
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  const formatted =
                    decimals > 0
                      ? obj.val.toFixed(decimals)
                      : Math.round(obj.val).toString();
                  el.textContent = formatted + suffix;
                },
              });
            });
          }, '-=0.4');

        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          gsap.to('[data-hero-product]', {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to('[data-hero-content]', {
            opacity: 0,
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom 50%',
              scrub: true,
            },
          });
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      data-parallax-root
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-hero-atmosphere"
    >
      {/* parallax cloud layers */}
      <ParallaxLayer speed={-15} className="absolute inset-x-0 top-0 h-[60vh]">
        <Image
          src="/parallax/cloud-1.svg"
          alt=""
          width={1600}
          height={400}
          className="h-full w-full object-cover opacity-90"
          priority
        />
      </ParallaxLayer>
      <ParallaxLayer speed={-35} className="absolute inset-x-0 bottom-0 h-[70vh]">
        <Image
          src="/parallax/cloud-2.svg"
          alt=""
          width={1600}
          height={500}
          className="h-full w-full object-cover"
        />
      </ParallaxLayer>
      <ParallaxLayer speed={-55} className="absolute inset-x-0 top-1/3 h-[40vh]">
        <Image
          src="/parallax/cloud-3.svg"
          alt=""
          width={1600}
          height={300}
          className="h-full w-full object-cover"
        />
      </ParallaxLayer>

      {/* subtle starfield */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6)_1px,transparent_1px),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.4)_1px,transparent_1px),radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:300px_300px,250px_250px,200px_200px]"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start gap-6 px-5 pb-12 pt-28 sm:pt-32 md:grid md:min-h-screen md:grid-cols-2 md:items-center md:justify-center md:gap-10 md:px-6 md:py-0">
        {/* Logo — solo desktop (col 2). Oculto en móvil */}
        <div
          data-hero-product
          className="relative order-1 hidden h-36 w-36 items-center justify-center sm:h-48 sm:w-48 md:order-2 md:flex md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-brand/40 blur-3xl animate-glow"
          />
          <div className="absolute inset-0 flex items-center justify-center animate-float">
            <Image
              src="/products/LogosinFondo.png"
              alt="Logo ClimaXpress"
              width={600}
              height={600}
              priority
              className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(79,179,217,0.4)]"
            />
          </div>
        </div>

        {/* Bloque de texto — orden 2 móvil, col 1 desktop */}
        <div
          data-hero-content
          className="order-2 flex w-full flex-col items-center text-center md:order-1 md:items-start md:text-left"
        >
          <p
            data-hero-eyebrow
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]"
          >
            Hermosillo · San Carlos · San Pedro el Saucito
          </p>
          <div
            data-hero-logo
            className="relative mt-8 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36 md:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-brand/40 blur-2xl animate-glow"
            />
            <div className="absolute inset-0 animate-float-slow">
              <Image
                src="/products/LogosinFondo_Circular.png"
                alt="Logo ClimaXpress"
                width={200}
                height={200}
                priority
                className="h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(79,179,217,0.4)]"
              />
            </div>
          </div>
          <h1
            id="hero-title"
            data-hero-title
            className="mt-2 text-balance text-[2.25rem] font-bold leading-[1.02] tracking-tight sm:mt-3 sm:text-5xl md:mt-8 md:text-7xl lg:text-8xl"
          >
            <span className="block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Renta de aerocoolers
            </span>
            <span className="block bg-gradient-to-b from-brand-sun via-brand-sun to-[#f08018] bg-clip-text text-transparent">
              y calentones
            </span>
          </h1>
          <p
            data-hero-sub
            className="mt-8 max-w-md text-balance text-sm text-white/65 sm:mt-8 sm:text-base md:max-w-xl md:text-lg"
          >
            Orgullosamente 100% hermosillense.
          </p>

          <div
            data-hero-stats
            className="mt-14 grid w-full max-w-md grid-cols-3 gap-3 sm:mt-14 sm:max-w-lg sm:gap-4 md:mt-14 md:max-w-none"
          >
            {[
              { value: 438, suffix: '+', label: 'Rentas concluidas', decimals: 0 },
              { value: 3, suffix: '+', label: 'Años de experiencia', decimals: 0 },
              { value: 4.8, suffix: '★', label: 'Estrellas en reseñas', decimals: 1 },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm transition-colors hover:border-white/20 sm:p-4 md:items-start md:p-5"
              >
                {i < 2 ? (
                  <span
                    aria-hidden
                    className="absolute -right-1.5 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
                  />
                ) : null}
                <span
                  data-stat-num
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                  data-decimals={stat.decimals}
                  className="bg-gradient-to-b from-white to-brand-light bg-clip-text text-2xl font-bold leading-none text-transparent tabular-nums sm:text-3xl md:text-4xl"
                >
                  {stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value}
                  {stat.suffix}
                </span>
                <span className="mt-1.5 text-center text-[10px] uppercase tracking-[0.08em] text-white/55 sm:mt-2 sm:text-xs md:text-left">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            data-hero-trust
            className="mt-auto flex items-center justify-center gap-2 pt-12 text-xs text-white/55 sm:text-sm md:mt-12 md:justify-start md:pt-0"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-brand-sun text-brand-sun sm:h-4 sm:w-4"
                  aria-hidden
                />
              ))}
            </div>
            <span>Clientes felices desde 2023</span>
          </div>

          <div
            data-hero-cta
            className="mt-5 flex w-full flex-col items-center gap-3 sm:mt-6 sm:w-auto sm:flex-row sm:gap-3 md:items-start md:justify-start"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-sun px-8 text-base font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(245,185,25,0.7)] transition-all duration-300 hover:scale-[1.03] hover:brightness-105 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Cotizar por WhatsApp
            </a>
            <a
              href="#aerocoolers"
              className="text-sm text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline sm:hidden"
            >
              Ver equipos ↓
            </a>
            <a
              href="#aerocoolers"
              className="hidden h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/10 sm:inline-flex"
            >
              Ver equipos
            </a>
          </div>
        </div>
      </Container>

      <a
        href="#aerocoolers"
        aria-label="Bajar a la sección de aerocoolers"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white"
      >
        <ChevronDown className="h-8 w-8 animate-bounce-soft" aria-hidden />
      </a>

      {/* bottom fade into next dark section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink"
      />
    </section>
  );
}
