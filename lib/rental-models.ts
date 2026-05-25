export type RentalCategory = 'aerocooler' | 'calenton';

export type RentalModel = {
  id: string;
  category: RentalCategory;
  name: string;
  pricePerDay: number;
  shortLabel: string;
};

export const rentalModels: RentalModel[] = [
  {
    id: 'eco-fresco',
    category: 'aerocooler',
    name: 'Eco-Fresco',
    pricePerDay: 450,
    shortLabel: 'Aerocooler Eco-Fresco',
  },
  {
    id: 'turbo-frio',
    category: 'aerocooler',
    name: 'Turbo-Frío',
    pricePerDay: 650,
    shortLabel: 'Aerocooler Turbo-Frío',
  },
  {
    id: 'cafe-obscuro',
    category: 'calenton',
    name: 'Café Obscuro',
    pricePerDay: 550,
    shortLabel: 'Calentón Café Obscuro',
  },
  {
    id: 'gris-claro',
    category: 'calenton',
    name: 'Gris Claro',
    pricePerDay: 550,
    shortLabel: 'Calentón Gris Claro',
  },
  {
    id: 'cafe-gratinado',
    category: 'calenton',
    name: 'Café Gratinado',
    pricePerDay: 550,
    shortLabel: 'Calentón Café Gratinado',
  },
];

export function getModelById(id: string): RentalModel | undefined {
  return rentalModels.find((m) => m.id === id);
}
