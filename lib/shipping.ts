// Tabla de costos de envío: km → MXN (round trip incluido).
// Fuente: tabla provista por el negocio.
export const shippingTable: Record<number, number> = {
  5: 89,
  6: 105,
  7: 122,
  8: 139,
  9: 157,
  10: 174,
  11: 192,
  12: 209,
  13: 227,
  14: 244,
  15: 261,
  16: 279,
  17: 296,
  18: 314,
  19: 331,
  20: 349,
  21: 366,
  22: 383,
  23: 401,
  24: 418,
  25: 436,
  26: 453,
  27: 471,
  28: 488,
  29: 505,
  30: 523,
  31: 540,
  32: 558,
  33: 575,
  34: 593,
  35: 610,
};

export const MIN_KM = 5;
export const MAX_KM = 35;

// Redondea al km más cercano (mínimo 5) y devuelve el costo.
// Retorna null si la distancia excede MAX_KM (fuera de zona de servicio).
export function getShippingCost(km: number): number | null {
  if (km > MAX_KM) return null;
  const rounded = Math.max(MIN_KM, Math.round(km));
  return shippingTable[rounded] ?? null;
}
