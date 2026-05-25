import { NextResponse } from 'next/server';

// Sesgo a Hermosillo para mejores sugerencias locales.
const BIAS_LAT = 29.0892;
const BIAS_LNG = -110.9613;
const BIAS_RADIUS_M = 60_000; // 60 km

type AutocompleteResponse = {
  status: string;
  error_message?: string;
  predictions: Array<{
    place_id: string;
    description: string;
    structured_formatting?: {
      main_text: string;
      secondary_text?: string;
    };
  }>;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('[autocomplete] GOOGLE_MAPS_API_KEY no está definida');
      return NextResponse.json(
        { error: 'El servicio no está configurado.' },
        { status: 500 }
      );
    }

    let input: string | undefined;
    let sessionToken: string | undefined;
    try {
      const body = await request.json();
      input = typeof body?.input === 'string' ? body.input.trim() : undefined;
      sessionToken =
        typeof body?.sessionToken === 'string' ? body.sessionToken : undefined;
    } catch (err) {
      console.error('[autocomplete] error parseando body', err);
      return NextResponse.json({ error: 'Petición inválida.' }, { status: 400 });
    }

    if (!input || input.length < 3) {
      return NextResponse.json({ predictions: [] });
    }

    const url = new URL(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json'
    );
    url.searchParams.set('input', input);
    url.searchParams.set('language', 'es');
    url.searchParams.set('components', 'country:mx');
    url.searchParams.set('location', `${BIAS_LAT},${BIAS_LNG}`);
    url.searchParams.set('radius', String(BIAS_RADIUS_M));
    url.searchParams.set('key', apiKey);
    if (sessionToken) url.searchParams.set('sessiontoken', sessionToken);

    let data: AutocompleteResponse;
    try {
      const res = await fetch(url.toString(), { cache: 'no-store' });
      const raw = await res.text();
      try {
        data = JSON.parse(raw) as AutocompleteResponse;
      } catch {
        console.error(
          '[autocomplete] Google devolvió respuesta no-JSON. HTTP',
          res.status,
          raw.slice(0, 300)
        );
        return NextResponse.json(
          { error: 'Respuesta inesperada del servicio de mapas.' },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error('[autocomplete] network error', err);
      return NextResponse.json(
        { error: 'No pudimos contactar el servicio de mapas.' },
        { status: 502 }
      );
    }

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error(
        '[autocomplete] Google non-OK:',
        data.status,
        '·',
        data.error_message
      );
      return NextResponse.json(
        {
          error:
            data.status === 'REQUEST_DENIED'
              ? 'Places API rechazó la solicitud. Verifica que Places API esté habilitada y que la API key permita uso desde el servidor.'
              : `Error consultando sugerencias (${data.status}).`,
        },
        { status: 400 }
      );
    }

    const predictions = (data.predictions ?? []).slice(0, 5).map((p) => ({
      placeId: p.place_id,
      mainText: p.structured_formatting?.main_text ?? p.description,
      secondaryText: p.structured_formatting?.secondary_text ?? '',
      description: p.description,
    }));

    return NextResponse.json({ predictions });
  } catch (err) {
    console.error('[autocomplete] uncaught error', err);
    return NextResponse.json(
      { error: 'Error interno del servidor de cotización.' },
      { status: 500 }
    );
  }
}
