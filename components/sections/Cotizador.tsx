'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  AlertCircle,
  Calculator,
  Loader2,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { whatsappLink } from '@/lib/site';
import {
  rentalModels,
  type RentalCategory,
  type RentalModel,
} from '@/lib/rental-models';

type QuoteResponse = {
  distanceKm: number;
  durationMin: number | null;
  destinationFormatted: string;
  shippingCost: number | null;
  inServiceArea: boolean;
  maxKm: number;
};

type Prediction = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
};

const formatMXN = (n: number) =>
  `$${n.toLocaleString('es-MX', { maximumFractionDigits: 0 })}`;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function newSessionToken() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const categoryLabels: Record<RentalCategory, string> = {
  aerocooler: 'Aerocoolers',
  calenton: 'Calentones',
};

const categoryAccent: Record<RentalCategory, { color: string; bg: string }> = {
  aerocooler: { color: 'text-brand-light', bg: 'bg-brand-light' },
  calenton: { color: 'text-brand-sun', bg: 'bg-brand-sun' },
};

// Cantidad inicial por defecto — un Eco-Fresco para arrancar la cotización.
const initialQuantities: Record<string, number> = rentalModels.reduce(
  (acc, m) => {
    acc[m.id] = m.id === 'eco-fresco' ? 1 : 0;
    return acc;
  },
  {} as Record<string, number>
);

export function Cotizador() {
  const ref = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<RentalCategory>('aerocooler');
  const [quantities, setQuantities] =
    useState<Record<string, number>>(initialQuantities);
  const [days, setDays] = useState(1);
  const [address, setAddress] = useState('');
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string>(() =>
    newSessionToken()
  );
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const addressBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const groupedModels = useMemo(() => {
    const groups: Record<RentalCategory, RentalModel[]> = {
      aerocooler: [],
      calenton: [],
    };
    for (const m of rentalModels) groups[m.category].push(m);
    return groups;
  }, []);

  const selectedItems = useMemo(
    () =>
      rentalModels
        .map((m) => ({ model: m, qty: quantities[m.id] ?? 0 }))
        .filter((i) => i.qty > 0),
    [quantities]
  );

  const rentalSubtotal = useMemo(
    () =>
      selectedItems.reduce(
        (sum, { model, qty }) => sum + model.pricePerDay * qty * days,
        0
      ),
    [selectedItems, days]
  );

  const totalUnits = useMemo(
    () => selectedItems.reduce((sum, { qty }) => sum + qty, 0),
    [selectedItems]
  );

  const unitsByCategory = useMemo(() => {
    const counts: Record<RentalCategory, number> = {
      aerocooler: 0,
      calenton: 0,
    };
    for (const { model, qty } of selectedItems) {
      counts[model.category] += qty;
    }
    return counts;
  }, [selectedItems]);

  const setQuantity = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: clamp(value, 0, 30) }));
    setQuote(null);
  };

  // Debounced autocomplete
  useEffect(() => {
    if (!showSuggestions) return;
    if (placeId && address) return;
    const q = address.trim();
    if (q.length < 3) {
      setPredictions([]);
      return;
    }
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setAutocompleteLoading(true);
      try {
        const res = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: q, sessionToken }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!controller.signal.aborted) {
          setPredictions(res.ok ? (data.predictions ?? []) : []);
          setActiveIndex(-1);
        }
      } catch {
        // ignorar abort/network
      } finally {
        if (!controller.signal.aborted) setAutocompleteLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [address, placeId, sessionToken, showSuggestions]);

  useEffect(() => {
    if (!showSuggestions) return;
    const onClick = (e: MouseEvent) => {
      if (!addressBoxRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [showSuggestions]);

  const onAddressChange = (value: string) => {
    setAddress(value);
    setPlaceId(null);
    if (quote || error) {
      setQuote(null);
      setError(null);
    }
    setShowSuggestions(true);
  };

  const onSelectPrediction = (p: Prediction) => {
    setAddress(p.description);
    setPlaceId(p.placeId);
    setPredictions([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const onAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || predictions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % predictions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? predictions.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < predictions.length) {
        e.preventDefault();
        onSelectPrediction(predictions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalUnits === 0) {
      setError('Agrega al menos un equipo a tu cotización.');
      return;
    }
    if (!address.trim()) {
      setError('Escribe una dirección para calcular el envío.');
      return;
    }
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address.trim(),
          placeId: placeId ?? undefined,
          sessionToken: placeId ? sessionToken : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'No pudimos calcular la cotización.');
        return;
      }
      setQuote(data as QuoteResponse);
      setSessionToken(newSessionToken());
    } catch {
      setError('Ocurrió un error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      gsap.from('[data-cot-heading]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });
      gsap.from('[data-cot-form]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      });
      gsap.from('[data-cot-result]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      });
    },
    { scope: ref }
  );

  const total =
    quote && quote.inServiceArea && quote.shippingCost !== null
      ? rentalSubtotal + quote.shippingCost
      : null;

  const itemsLine = selectedItems
    .map(({ model, qty }) => `${qty}× ${model.shortLabel}`)
    .join(', ');

  const whatsappMessage =
    quote && quote.inServiceArea && quote.shippingCost !== null && total !== null
      ? `Hola ClimaXpress, quiero reservar ${itemsLine} por ${days} día${days === 1 ? '' : 's'} en "${quote.destinationFormatted}". Cotización web: renta ${formatMXN(rentalSubtotal)} + envío ${formatMXN(quote.shippingCost)} = ${formatMXN(total)} total.`
      : `Hola ClimaXpress, mi ubicación está fuera del radio de servicio inmediato pero me interesa cotizar ${itemsLine || 'una renta'} por ${days} día${days === 1 ? '' : 's'}. Mi dirección: ${address}`;

  const listboxOpen =
    showSuggestions && (predictions.length > 0 || autocompleteLoading);

  return (
    <section
      ref={ref}
      id="cotizador"
      aria-labelledby="cot-title"
      className="relative isolate z-30 bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_20%_15%,rgba(79,179,217,0.10)_0%,transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(245,185,25,0.10)_0%,transparent_55%)]"
      />

      <Container className="relative z-10">
        <div data-cot-heading className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
            Cotizador instantáneo
          </p>
          <h2
            id="cot-title"
            className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-brand-light via-white to-brand-sun bg-clip-text text-transparent">
              Cotiza tu renta en segundos
            </span>
          </h2>
          <p className="mt-4 text-balance text-base text-white/65 sm:text-lg">
            Combina los equipos que necesites, escribe tu dirección y te damos al momento el total con envío incluido.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <form
            data-cot-form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            {/* Paso 1: Productos con cantidades (tabs por categoría) */}
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Paso 1 · Equipos
              </legend>
              <p className="mt-1 text-xs text-white/45">
                Ajusta la cantidad de cada modelo. Puedes combinar entre las dos pestañas.
              </p>

              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Selecciona categoría de equipo"
                className="mt-4 grid grid-cols-2 gap-2"
              >
                {(Object.keys(groupedModels) as RentalCategory[]).map((cat) => {
                  const active = cat === activeCategory;
                  const isSun = cat === 'calenton';
                  const count = unitsByCategory[cat];
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        active
                          ? isSun
                            ? 'border-brand-sun/60 bg-brand-sun/15 text-brand-sun shadow-[0_4px_20px_-8px_rgba(245,185,25,0.5)]'
                            : 'border-brand-light/60 bg-brand-light/15 text-brand-light shadow-[0_4px_20px_-8px_rgba(79,179,217,0.5)]'
                          : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:bg-white/[0.04] hover:text-white/80'
                      }`}
                    >
                      <span>{categoryLabels[cat]}</span>
                      {count > 0 && (
                        <span
                          aria-label={`${count} seleccionado${count === 1 ? '' : 's'}`}
                          className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[0.7rem] font-bold tabular-nums ${
                            isSun
                              ? 'bg-brand-sun text-ink'
                              : 'bg-brand-light text-ink'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Modelos de la categoría activa */}
              <div className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                {groupedModels[activeCategory].map((m) => {
                  const qty = quantities[m.id] ?? 0;
                  const active = qty > 0;
                  const accent = categoryAccent[activeCategory];
                  return (
                    <div
                      key={m.id}
                      className={`flex items-center justify-between gap-3 px-4 py-3 transition-colors ${active ? 'bg-white/[0.03]' : ''}`}
                    >
                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-semibold ${active ? 'text-white' : 'text-white/85'}`}
                        >
                          {m.name}
                        </p>
                        <p className="mt-0.5 text-xs text-white/55">
                          {formatMXN(m.pricePerDay)} / día
                        </p>
                      </div>
                      <QtyStepper
                        value={qty}
                        onChange={(v) => setQuantity(m.id, v)}
                        ariaLabel={`Cantidad de ${m.name}`}
                        accentBg={accent.bg}
                      />
                    </div>
                  );
                })}
              </div>

              {totalUnits > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                  <span className="text-white/65">
                    {totalUnits} equipo{totalUnits === 1 ? '' : 's'} en total
                  </span>
                  <span className="font-semibold text-white">
                    {formatMXN(rentalSubtotal / days)} / día
                  </span>
                </div>
              )}
            </fieldset>

            {/* Paso 2: Días + dirección */}
            <fieldset className="mt-8">
              <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Paso 2 · Detalles
              </legend>

              <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_2fr]">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Días
                  </label>
                  <div className="mt-2">
                    <QtyStepper
                      value={days}
                      onChange={(v) => {
                        setDays(clamp(v, 1, 30));
                        setQuote(null);
                      }}
                      min={1}
                      ariaLabel="Cantidad de días"
                      accentBg="bg-brand-light"
                      wide
                    />
                  </div>
                </div>

                <div ref={addressBoxRef}>
                  <label
                    htmlFor="cot-address"
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55"
                  >
                    Dirección de entrega
                  </label>
                  <div className="relative mt-2">
                    <MapPin
                      aria-hidden
                      className="pointer-events-none absolute left-4 top-[1.125rem] h-5 w-5 -translate-y-1/2 text-white/35"
                    />
                    <input
                      id="cot-address"
                      ref={inputRef}
                      type="text"
                      value={address}
                      onChange={(e) => onAddressChange(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={onAddressKeyDown}
                      placeholder="Empieza a escribir tu dirección…"
                      autoComplete="off"
                      role="combobox"
                      aria-expanded={listboxOpen}
                      aria-controls="cot-address-listbox"
                      aria-autocomplete="list"
                      aria-activedescendant={
                        activeIndex >= 0
                          ? `cot-pred-${activeIndex}`
                          : undefined
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-all focus:border-brand-light/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-light/30"
                    />

                    {listboxOpen && (
                      <ul
                        id="cot-address-listbox"
                        role="listbox"
                        aria-label="Sugerencias de dirección"
                        className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border border-white/10 bg-ink p-1 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]"
                      >
                        {autocompleteLoading && predictions.length === 0 ? (
                          <li className="flex items-center gap-2 px-3 py-3 text-sm text-white/55">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            Buscando direcciones…
                          </li>
                        ) : (
                          predictions.map((p, i) => {
                            const active = i === activeIndex;
                            return (
                              <li
                                key={p.placeId}
                                id={`cot-pred-${i}`}
                                role="option"
                                aria-selected={active}
                              >
                                <button
                                  type="button"
                                  onClick={() => onSelectPrediction(p)}
                                  onMouseEnter={() => setActiveIndex(i)}
                                  className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left transition-colors ${
                                    active
                                      ? 'bg-brand-light/15'
                                      : 'hover:bg-white/[0.04]'
                                  }`}
                                >
                                  <MapPin
                                    aria-hidden
                                    className="mt-0.5 h-4 w-4 flex-none text-brand-light"
                                  />
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">
                                      {p.mainText}
                                    </p>
                                    {p.secondaryText && (
                                      <p className="truncate text-xs text-white/55">
                                        {p.secondaryText}
                                      </p>
                                    )}
                                  </div>
                                </button>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-light text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(79,179,217,0.7)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              ) : (
                <Calculator className="h-5 w-5" aria-hidden />
              )}
              {loading ? 'Calculando…' : 'Calcular cotización'}
            </button>

            {error && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
                <p>{error}</p>
              </div>
            )}
          </form>

          {/* Resultado */}
          <div data-cot-result aria-live="polite" className="lg:col-span-2">
            {!quote ? (
              <div className="flex h-full min-h-[20rem] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-light/10 text-brand-light">
                  <Truck className="h-6 w-6" aria-hidden />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  Tu cotización aparecerá aquí
                </p>
                <p className="mt-2 text-xs text-white/55">
                  Llenamos el desglose en cuanto calcules.
                </p>
              </div>
            ) : !quote.inServiceArea ? (
              <div className="rounded-3xl border border-brand-sun/30 bg-brand-sun/[0.06] p-6 sm:p-8">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-sun/15 text-brand-sun">
                  <AlertCircle className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  Fuera del radio inmediato
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Tu ubicación está a {quote.distanceKm} km de la bodega — más
                  allá de nuestro radio de servicio directo ({quote.maxKm} km).
                  Contáctanos por WhatsApp para cotización personalizada.
                </p>
                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebf5a]"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  Cotizar por WhatsApp
                </a>
              </div>
            ) : (
              <div className="rounded-3xl border border-brand-light/30 bg-brand-light/[0.05] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">
                  Tu cotización
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 flex-none text-white/45" aria-hidden />
                  <span className="truncate">{quote.destinationFormatted}</span>
                </div>
                <p className="mt-1 text-xs text-white/55">
                  {quote.distanceKm} km
                  {quote.durationMin !== null && ` · ~${quote.durationMin} min`}
                </p>

                <dl className="mt-6 space-y-2.5 border-y border-white/10 py-5 text-sm">
                  {selectedItems.map(({ model, qty }) => {
                    const lineTotal = model.pricePerDay * qty * days;
                    return (
                      <div
                        key={model.id}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-white/80">
                            {qty}× {model.name}
                          </p>
                          <p className="text-[0.7rem] text-white/45">
                            {formatMXN(model.pricePerDay)} × {qty} × {days}{' '}
                            {days === 1 ? 'día' : 'días'}
                          </p>
                        </div>
                        <span className="font-semibold text-white">
                          {formatMXN(lineTotal)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-baseline justify-between gap-3 pt-2">
                    <span className="text-white/65">Subtotal renta</span>
                    <span className="font-semibold text-white">
                      {formatMXN(rentalSubtotal)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-white/65">Envío</span>
                    <span className="font-semibold text-white">
                      {formatMXN(quote.shippingCost!)}
                    </span>
                  </div>
                </dl>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
                    Total estimado
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formatMXN(total!)}
                  </span>
                </div>

                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebf5a]"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  Reservar por WhatsApp
                </a>
                <p className="mt-3 text-center text-[0.7rem] text-white/40">
                  Sin anticipo · Confirmamos disponibilidad por WhatsApp
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

type QtyStepperProps = {
  value: number;
  onChange: (v: number) => void;
  ariaLabel: string;
  accentBg: string;
  min?: number;
  wide?: boolean;
};

function QtyStepper({
  value,
  onChange,
  ariaLabel,
  accentBg,
  min = 0,
  wide = false,
}: QtyStepperProps) {
  const active = value > 0 && min === 0;
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex items-center rounded-full border transition-colors ${
        active
          ? 'border-white/15 bg-white/[0.06]'
          : 'border-white/10 bg-white/[0.03]'
      } ${wide ? 'w-full' : ''}`}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Disminuir"
        className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-white/70"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span
        aria-live="polite"
        className={`min-w-[2.5rem] text-center text-base font-bold tabular-nums ${wide ? 'flex-1' : ''} ${
          value > 0 ? 'text-white' : 'text-white/40'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar"
        className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-white transition-all hover:scale-105 ${
          value > 0 ? accentBg : 'bg-white/10 hover:bg-white/20'
        } ${value > 0 ? 'text-ink' : ''}`}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
