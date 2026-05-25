'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/cn';

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  links: NavLink[];
  ctaHref: string;
};

export function MobileMenu({ links, ctaHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (open) {
      setRendered(true);
      document.body.style.overflow = 'hidden';
      return;
    }
    setVisible(false);
    document.body.style.overflow = '';
    const t = setTimeout(() => setRendered(false), 500);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!rendered || !open) return;
    // Double RAF: first RAF lets the browser paint the initial off-screen
    // state (translate-x-full), the second flips to translate-x-0 so the CSS
    // transition has a starting and ending value to animate between.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [rendered, open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
      >
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        <span
          aria-hidden
          className={cn(
            'absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out',
            open ? 'translate-y-0 rotate-45' : '-translate-y-[5px] rotate-0'
          )}
        />
        <span
          aria-hidden
          className={cn(
            'absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out',
            open ? 'translate-y-0 -rotate-45' : 'translate-y-[5px] rotate-0'
          )}
        />
      </button>

      {rendered && portalReady
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={cn(
            'fixed inset-0 z-[60] overflow-y-auto bg-ink/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pt-safe pb-safe',
            visible ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* atmospheric background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_30%_20%,rgba(79,179,217,0.10)_0%,transparent_55%),radial-gradient(ellipse_at_70%_85%,rgba(245,185,25,0.10)_0%,transparent_55%)]"
          />

          <div className="relative flex h-full min-h-[100svh] flex-col px-5 pb-10 pt-6">
            <div className="flex items-center justify-between">
              <Image
                src="/products/LogosinFondo.png"
                alt="ClimaXpress"
                width={140}
                height={42}
                className="h-9 w-auto"
                priority
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <span
                  aria-hidden
                  className="absolute h-[2px] w-5 rounded-full bg-current rotate-45"
                />
                <span
                  aria-hidden
                  className="absolute h-[2px] w-5 rounded-full bg-current -rotate-45"
                />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-2xl font-bold text-white/90 transition-all duration-300 hover:border-brand-light/30 hover:bg-white/[0.03] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium tracking-widest text-white/30">
                      0{i + 1}
                    </span>
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-light"
                  >
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-sun text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,185,25,0.6)] transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Cotizar por WhatsApp
              </a>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-brand-light"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Correo
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-sun/40 hover:text-brand-sun"
                  >
                    <Instagram className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-light/40 hover:text-brand-light"
                  >
                    <Facebook className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
        : null}
    </div>
  );
}
