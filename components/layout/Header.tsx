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
          'mx-auto flex max-w-6xl items-center gap-2 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-500 md:px-3',
          scrolled
            ? 'border-white/15 bg-ink/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.7)]'
            : 'border-white/[0.07] bg-ink/25 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.5)]'
        )}
      >
        {/* LEFT: WhatsApp */}
        <div className="flex flex-1 items-center justify-start">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cotizar por WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_-4px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 hover:brightness-105"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
        </div>

        {/* CENTER: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="ClimaXpress — Inicio"
        >
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
