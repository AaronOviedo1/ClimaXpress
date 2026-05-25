export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: string;
  imagen: string;
  categoria: 'aerocoolers' | 'calentones';
};

export const aerocoolers: Product[] = [
  {
    id: 'aero-1',
    nombre: 'Eco Fresco',
    descripcion: '{{DESCRIPCION_1}}',
    capacidad: '{{CAPACIDAD}}',
    imagen: '/products/ecoyturbo01.png',
    categoria: 'aerocoolers',
  },
  {
    id: 'aero-2',
    nombre: 'Turbo Frío',
    descripcion: '{{DESCRIPCION_2}}',
    capacidad: '{{CAPACIDAD}}',
    imagen: '/products/turbo01.png',
    categoria: 'aerocoolers',
  },
];

export const aerocoolerGalleryImages = [
  '/products/ecoyturbo01.png',
  '/products/ecoyturbo02.png',
  '/products/ecoyturbo03.png',
];

export const calentones: Product[] = [
  {
    id: 'cal-1',
    nombre: '{{MODELO_CALENTON_1}}',
    descripcion: '{{DESCRIPCION_1}}',
    capacidad: '{{LITROS}}',
    imagen: '/products/cal-01.JPG',
    categoria: 'calentones',
  },
  {
    id: 'cal-2',
    nombre: '{{MODELO_CALENTON_2}}',
    descripcion: '{{DESCRIPCION_2}}',
    capacidad: '{{LITROS}}',
    imagen: '/products/cal-2.svg',
    categoria: 'calentones',
  },
  {
    id: 'cal-3',
    nombre: '{{MODELO_CALENTON_3}}',
    descripcion: '{{DESCRIPCION_3}}',
    capacidad: '{{LITROS}}',
    imagen: '/products/cal-3.svg',
    categoria: 'calentones',
  },
];

export const featuredProducts: Product[] = [...aerocoolers, ...calentones];
