import { NextResponse } from 'next/server';
import { getShippingCost, MAX_KM } from '@/lib/shipping';

const WAREHOUSE_LAT = 29.129870;
const WAREHOUSE_LNG = -110.966203;

type Location = { lat: number; lng: number };

type GeocodeResponse = {
  status: string;
  error_message?: string;
  results: Array<{
    formatted_address: string;
    geometry: { location: Location };
  }>;
};

type PlaceDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    formatted_address: string;
    geometry: { location: Location };
  };
};

type DistanceMatrixResponse = {
  status: string;
  error_message?: string;
  rows: Array<{
    elements: Array<{
      status: string;
      distance?: { value: number; text: string };
      duration?: { value: number; text: string };
    }>;
  }>;
};

function googleError(status: string, errorMessage?: string) {
  // Mensaje genérico al cliente — el detalle queda en logs del servidor.
  if (status === 'REQUEST_DENIED') {
    return 'El servicio de mapas rechazó la solicitud. Verifica que la API key tenga habilitadas Geocoding, Places y Distance Matrix APIs (y que la restricción de la key no bloquee llamadas desde el servidor).';
  }
  if (status === 'OVER_QUERY_LIMIT') {
    return 'Se alcanzó el límite de consultas a Google Maps. Intenta más tarde.';
  }
  if (status === 'ZERO_RESULTS') {
    return 'No pudimos encontrar esa dirección. Intenta ser más específico (calle, colonia, ciudad).';
  }
  if (status === 'INVALID_REQUEST') {
    return 'La dirección que enviaste no es válida.';
  }
  return errorMessage ?? 'Ocurrió un error consultando el servicio de mapas.';
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'El servicio de cotización no está configurado.' },
      { status: 500 }
    );
  }

  let address: string | undefined;
  let placeId: string | undefined;
  let sessionToken: string | undefined;
  try {
    const body = await request.json();
    address = typeof body?.address === 'string' ? body.address.trim() : undefined;
    placeId = typeof body?.placeId === 'string' ? body.placeId : undefined;
    sessionToken =
      typeof body?.sessionToken === 'string' ? body.sessionToken : undefined;
  } catch {
    return NextResponse.json({ error: 'Petición inválida.' }, { status: 400 });
  }

  if (!placeId && (!address || address.length < 5)) {
    return NextResponse.json(
      { error: 'Escribe una dirección más específica.' },
      { status: 400 }
    );
  }

  let location: Location;
  let formattedAddress: string;

  // Preferimos Place Details (con session token = autocomplete sale gratis).
  if (placeId) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'formatted_address,geometry/location');
    url.searchParams.set('language', 'es');
    url.searchParams.set('key', apiKey);
    if (sessionToken) url.searchParams.set('sessiontoken', sessionToken);

    let details: PlaceDetailsResponse;
    try {
      const res = await fetch(url.toString(), { cache: 'no-store' });
      details = (await res.json()) as PlaceDetailsResponse;
    } catch (err) {
      console.error('[quote] place details network error', err);
      return NextResponse.json(
        { error: 'No pudimos contactar el servicio de mapas. Intenta de nuevo.' },
        { status: 502 }
      );
    }

    if (details.status !== 'OK' || !details.result) {
      console.error(
        '[quote] place details non-OK:',
        details.status,
        details.error_message
      );
      return NextResponse.json(
        { error: googleError(details.status, details.error_message) },
        { status: 400 }
      );
    }
    location = details.result.geometry.location;
    formattedAddress = details.result.formatted_address;
  } else {
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    url.searchParams.set('address', address!);
    url.searchParams.set('region', 'mx');
    url.searchParams.set('language', 'es');
    url.searchParams.set('key', apiKey);

    let geocode: GeocodeResponse;
    try {
      const res = await fetch(url.toString(), { cache: 'no-store' });
      geocode = (await res.json()) as GeocodeResponse;
    } catch (err) {
      console.error('[quote] geocode network error', err);
      return NextResponse.json(
        { error: 'No pudimos contactar el servicio de mapas. Intenta de nuevo.' },
        { status: 502 }
      );
    }

    if (geocode.status !== 'OK' || !geocode.results.length) {
      console.error(
        '[quote] geocode non-OK:',
        geocode.status,
        geocode.error_message
      );
      return NextResponse.json(
        { error: googleError(geocode.status, geocode.error_message) },
        { status: 400 }
      );
    }
    location = geocode.results[0].geometry.location;
    formattedAddress = geocode.results[0].formatted_address;
  }

  // Distance Matrix: bodega → destino
  const dmUrl = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
  dmUrl.searchParams.set('origins', `${WAREHOUSE_LAT},${WAREHOUSE_LNG}`);
  dmUrl.searchParams.set('destinations', `${location.lat},${location.lng}`);
  dmUrl.searchParams.set('mode', 'driving');
  dmUrl.searchParams.set('language', 'es');
  dmUrl.searchParams.set('units', 'metric');
  dmUrl.searchParams.set('key', apiKey);

  let dm: DistanceMatrixResponse;
  try {
    const res = await fetch(dmUrl.toString(), { cache: 'no-store' });
    dm = (await res.json()) as DistanceMatrixResponse;
  } catch (err) {
    console.error('[quote] distance matrix network error', err);
    return NextResponse.json(
      { error: 'No pudimos calcular la distancia. Intenta de nuevo.' },
      { status: 502 }
    );
  }

  const element = dm.rows?.[0]?.elements?.[0];
  if (dm.status !== 'OK' || !element || element.status !== 'OK' || !element.distance) {
    console.error(
      '[quote] distance matrix non-OK:',
      dm.status,
      dm.error_message,
      element?.status
    );
    return NextResponse.json(
      { error: googleError(dm.status, dm.error_message) },
      { status: 400 }
    );
  }

  const distanceKm = element.distance.value / 1000;
  const durationMin = element.duration ? Math.round(element.duration.value / 60) : null;
  const shippingCost = getShippingCost(distanceKm);
  const inServiceArea = shippingCost !== null;

  return NextResponse.json({
    distanceKm: Math.round(distanceKm * 10) / 10,
    durationMin,
    destinationFormatted: formattedAddress,
    shippingCost,
    inServiceArea,
    maxKm: MAX_KM,
  });
}
