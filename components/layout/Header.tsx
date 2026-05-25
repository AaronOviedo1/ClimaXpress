'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { whatsappLink } from '@/lib/site';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/#aerocoolers', label: 'Aerocoolers' },
  { href: '/#calentones', label: 'Calentones' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/#testimonios', label: 'Testimonios' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 mt-safe md:top-4 md:px-6">
      <div
        className={cn(
          'relative mx-auto flex max-w-6xl items-center gap-2 overflow-hidden rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-500 md:px-3',
          scrolled
            ? 'border-white/15 bg-ink/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.7)]'
            : 'border-white/[0.07] bg-ink/25 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.5)]'
        )}
      >
        {/* Top highlight — premium glass reflection */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        {/* LEFT: WhatsApp with pulse + gradient + glow */}
        <div className="flex flex-1 items-center justify-start">
          <div className="relative">
            {/* Expanding pulse ring (loops continuously) */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#25D366]/55 animate-pulse-ring"
            />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotizar por WhatsApp"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#34e07a] via-[#25D366] to-[#0d8a4a] text-white shadow-[0_6px_24px_-4px_rgba(37,211,102,0.85),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_32px_-4px_rgba(37,211,102,1)]"
            >
              <MessageCircle className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" aria-hidden />
            </a>
            {/* Activity indicator dot — "estamos disponibles" */}
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5"
            >
              <span className="absolute inset-0 rounded-full bg-[#4ade80] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4ade80] ring-2 ring-ink animate-pulse-dot" />
            </span>
          </div>
        </div>

        {/* CENTER: Logo with subtle glow halo */}
        <Link
          href="/"
          className="relative flex shrink-0 items-center"
          aria-label="ClimaXpress — Inicio"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-brand/25 blur-2xl"
          />
          <Image
            src="/products/LogosinFondo.png"
            alt="Logo de ClimaXpress"
            width={180}
            height={54}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        {/* RIGHT: Nav (desktop) + Hamburger (mobile) */}
        <div className="flex flex-1 items-center justify-end gap-1">
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-0.5 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <MobileMenu links={navLinks} ctaHref={whatsappLink()} />
        </div>
      </div>
    </header>
  );
}
