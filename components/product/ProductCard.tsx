import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/products';
import { Card } from '@/components/ui/Card';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const detailHref = `/productos/${product.categoria}#${product.id}`;
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-gradient-soft">
        <Image
          src={product.imagen}
          alt={`Imagen del producto ${product.nombre}`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          {product.categoria === 'aerocoolers' ? 'Aerocooler' : 'Calentón'}
        </span>
        <h3 className="text-xl font-semibold text-ink">{product.nombre}</h3>
        <p className="text-sm text-ink-muted">{product.descripcion}</p>
        <p className="text-sm font-medium text-ink">
          Capacidad: <span className="text-ink-muted">{product.capacidad}</span>
        </p>
        <Link
          href={detailHref}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Más información
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
