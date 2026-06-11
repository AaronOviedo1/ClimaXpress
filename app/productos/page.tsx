import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Flame, Wind } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from '@/components/product/ProductGrid';
import { aerocoolers, calentones } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Renta de Aerocoolers y Calentones en Hermosillo — Catálogo',
  description:
    'Catálogo de aerocoolers y calentones en renta en Hermosillo. Enfriadores evaporativos y calentadores de paso a gas con entrega, instalación profesional y garantía.',
  keywords: [
    'renta de aerocoolers en Hermosillo',
    'renta de calentones en Hermosillo',
    'aerocoolers en renta',
    'calentones en renta',
    'catálogo aerocoolers Hermosillo',
    'catálogo calentones Hermosillo',
    'enfriadores evaporativos',
    'calentadores de paso',
  ],
  alternates: { canonical: '/productos' },
};

export default function ProductosPage() {
  return (
    <div className="bg-surface text-ink">
      <section className="bg-brand-gradient-soft pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Catálogo"
            title="Renta de aerocoolers y calentones en Hermosillo"
            description="Equipos en renta seleccionados para climatizar y dar agua caliente a tu hogar o negocio en Hermosillo y alrededores."
            as="h1"
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/productos/aerocoolers"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <Wind className="h-4 w-4" aria-hidden="true" />
              Ver aerocoolers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/productos/calentones"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand bg-white px-6 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
            >
              <Flame className="h-4 w-4" aria-hidden="true" />
              Ver calentones
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="aerocoolers-list">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2
                id="aerocoolers-list"
                className="text-2xl font-bold text-ink md:text-3xl"
              >
                Aerocoolers
              </h2>
              <p className="mt-2 text-ink-muted">
                Enfriamiento eficiente con bajo consumo energético.
              </p>
            </div>
            <Link
              href="/productos/aerocoolers"
              className="hidden text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex"
            >
              Ver detalle →
            </Link>
          </div>
          <ProductGrid products={aerocoolers} />
        </Container>
      </section>

      <section
        className="bg-surface-soft py-16 md:py-24"
        aria-labelledby="calentones-list"
      >
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2
                id="calentones-list"
                className="text-2xl font-bold text-ink md:text-3xl"
              >
                Calentones
              </h2>
              <p className="mt-2 text-ink-muted">
                Agua caliente al instante con calentones de paso a gas.
              </p>
            </div>
            <Link
              href="/productos/calentones"
              className="hidden text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex"
            >
              Ver detalle →
            </Link>
          </div>
          <ProductGrid products={calentones} />
        </Container>
      </section>
    </div>
  );
}
