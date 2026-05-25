import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site';

const quickLinks = [
  { href: '/#aerocoolers', label: 'Aerocoolers' },
  { href: '/#calentones', label: 'Calentones' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/40 to-transparent"
      />
      <Container as="div" className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="ClimaXpress — Inicio"
            >
              <Image
                src="/products/LogosinFondo_Circular.png"
                alt="Logo de ClimaXpress"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="text-xl font-bold text-white">ClimaXpress</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/55">
              Renta de aerocoolers y calentones con instalación incluida.
              Servicio express por WhatsApp.
            </p>
          </div>

          <nav aria-label="Enlaces rápidos">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Enlaces
            </h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-sun"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Síguenos
            </h2>
            <ul className="mt-4 flex items-center gap-3">
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de ClimaXpress"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-brand-sun hover:text-brand-sun"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de ClimaXpress"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-brand-light hover:text-brand-light"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-white/55">
              Escríbenos:{' '}
              <a
                className="text-brand-light hover:underline"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/35">
          © {year} ClimaXpress. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
