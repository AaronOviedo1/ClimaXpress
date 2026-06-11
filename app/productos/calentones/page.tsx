import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, Flame } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { calentones } from '@/lib/products';
import { siteConfig, whatsappLink } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Renta de Calentones en Hermosillo',
  description:
    'Renta de calentones en Hermosillo, San Carlos y San Pedro el Saucito: calentadores de paso a gas con agua caliente al instante, entrega e instalación. Renta y garantía con ClimaXpress.',
  keywords: [
    'renta de calentones en Hermosillo',
    'calentones en renta',
    'calentones Hermosillo',
    'renta de calentones',
    'calentador de paso Hermosillo',
    'calentón de paso',
    'agua caliente al instante',
    'instalación de calentón',
  ],
  alternates: { canonical: '/productos/calentones' },
  openGraph: {
    title: 'Renta de Calentones en Hermosillo | ClimaXpress',
    description:
      'Renta de calentones de paso a gas en Hermosillo con entrega, instalación profesional y garantía.',
  },
};

const calentonServiceSchema = serviceSchema({
  name: 'Renta de calentones en Hermosillo',
  description:
    'Renta de calentones de paso a gas en Hermosillo y alrededores, con agua caliente al instante, entrega e instalación profesional incluida.',
  serviceType: 'Renta de calentadores de paso a gas',
  url: `${siteConfig.url}/productos/calentones`,
  minPrice: 550,
});

const features = [
  'Agua caliente al instante',
  'Mayor ahorro de gas vs. boilers de depósito',
  'Encendido automático',
  'Instalación con técnicos certificados',
  'Garantía y soporte durante toda la renta',
];

export default function CalentonesPage() {
  return (
    <div className="bg-surface text-ink">
      <JsonLd data={calentonServiceSchema} />
      <section
        aria-labelledby="cal-hero"
        className="relative overflow-hidden bg-gradient-to-br from-brand-sun via-orange-500 to-brand-sunDark text-white"
      >
        <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Flame className="h-4 w-4" aria-hidden="true" /> Calentones
            </span>
            <h1
              id="cal-hero"
              className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            >
              Renta de calentones en Hermosillo
            </h1>
            <p className="max-w-2xl text-base text-white/95 md:text-lg">
              Renta de calentones (calentadores de paso a gas) en Hermosillo,
              San Carlos y San Pedro el Saucito. Agua caliente al instante, solo
              encienden cuando los necesitas: más ahorro, sin esperas y con
              entrega e instalación profesional incluida.
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
              href={whatsappLink('Hola ClimaXpress, me interesa rentar un calentón')}
              external
              variant="secondary"
              size="lg"
              className="mt-4"
            >
              Cotizar un calentón
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="cal-modelos">
        <Container>
          <SectionHeading
            eyebrow="Modelos disponibles"
            title="Nuestra línea de calentones"
            description="Capacidades para distintos tamaños de hogar, salidas simultáneas y rendimiento."
            as="h2"
          />
          <div className="mt-12 grid gap-8">
            {calentones.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="grid gap-6 rounded-3xl border border-surface-border bg-white p-6 shadow-card md:grid-cols-[1fr_2fr] md:gap-10 md:p-10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100">
                  <Image
                    src={product.imagen}
                    alt={`Calentón ${product.nombre}`}
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
                        `Hola ClimaXpress, me interesa el calentón ${product.nombre}`
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
    </div>
  );
}
