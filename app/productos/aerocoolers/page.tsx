import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, Wind } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { aerocoolers, aerocoolerGalleryImages } from '@/lib/products';
import { whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aerocoolers — Renta e Instalación',
  description:
    'Renta de aerocoolers para hogar y negocio: enfriadores evaporativos con aire fresco y limpio, bajo consumo y montaje profesional. Cotiza tu renta con ClimaXpress.',
  keywords: [
    'aerocooler',
    'aerocoolers',
    'enfriador evaporativo',
    'aire fresco',
    'enfriadores de aire',
    'renta de aerocooler',
    'instalación aerocooler',
  ],
  alternates: { canonical: '/productos/aerocoolers' },
  openGraph: {
    title: 'Aerocoolers — Renta e Instalación | ClimaXpress',
    description:
      'Renta de enfriadores evaporativos con instalación profesional, garantía y servicio express.',
  },
};

const features = [
  'Aire fresco y filtrado',
  'Bajo consumo energético',
  'Ideal para climas cálidos y secos',
  'Instalación profesional incluida',
  'Garantía y soporte durante toda la renta',
];

export default function AerocoolersPage() {
  return (
    <div className="bg-surface text-ink">
      <section
        aria-labelledby="aero-hero"
        className="bg-brand-gradient text-white"
      >
        <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Wind className="h-4 w-4" aria-hidden="true" /> Aerocoolers
            </span>
            <h1
              id="aero-hero"
              className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            >
              Enfriamiento eficiente para tu hogar o negocio
            </h1>
            <p className="max-w-2xl text-base text-white/90 md:text-lg">
              Los aerocoolers son enfriadores evaporativos que refrescan el
              aire con un consumo mínimo. Ideales para climas cálidos y secos,
              con aire siempre limpio y renovado.
            </p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-white/95">
                  <Check className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              href={whatsappLink('Hola ClimaXpress, me interesa rentar un aerocooler')}
              external
              variant="secondary"
              size="lg"
              className="mt-4"
            >
              Cotizar un aerocooler
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="aero-modelos">
        <Container>
          <SectionHeading
            eyebrow="Modelos disponibles"
            title="Nuestra línea de aerocoolers"
            description="Equipos para distintos tamaños de espacio y necesidades de flujo de aire."
            as="h2"
          />
          <div className="mt-12 grid gap-8">
            {aerocoolers.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="grid gap-6 rounded-3xl border border-surface-border bg-white p-6 shadow-card md:grid-cols-[1fr_2fr] md:gap-10 md:p-10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-gradient-soft">
                  <Image
                    src={product.imagen}
                    alt={`Aerocooler ${product.nombre}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="text-2xl font-bold text-ink md:text-3xl">
                    {product.nombre}
                  </h3>
                  <p className="text-ink-muted">{product.descripcion}</p>
                  <p className="text-sm font-medium text-ink">
                    Capacidad:{' '}
                    <span className="text-ink-muted">{product.capacidad}</span>
                  </p>
                  <div className="mt-2">
                    <Button
                      href={whatsappLink(
                        `Hola ClimaXpress, me interesa el aerocooler ${product.nombre}`
                      )}
                      external
                      size="md"
                    >
                      Solicitar cotización
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="bg-surface-soft py-16 md:py-24"
        aria-labelledby="aero-galeria"
      >
        <Container>
          <SectionHeading
            eyebrow="Galería"
            title="Eco Fresco y Turbo Frío en acción"
            description="Distintos ángulos de nuestra línea de aerocoolers."
            as="h2"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aerocoolerGalleryImages.map((src, index) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-surface-border bg-white shadow-card"
              >
                <Image
                  src={src}
                  alt={`Aerocoolers Eco Fresco y Turbo Frío — vista ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
