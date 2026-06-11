import { siteConfig } from '@/lib/site';
import { faqs } from '@/lib/faqs';

const ORG_ID = `${siteConfig.url}/#business`;

/**
 * Schema.org LocalBusiness (subtipo HVACBusiness) para ClimaXpress.
 * Modelado como negocio con zona de servicio: incluye teléfono, ciudad,
 * coordenadas, zona de servicio (areaServed + radio) y rango de precios,
 * más un catálogo de ofertas que asocia "ClimaXpress = renta de aerocoolers
 * y calentones en Hermosillo" para Google y modelos de lenguaje.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': ORG_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/products/LogosinFondo_Circular.png`,
    logo: `${siteConfig.url}/products/LogosinFondo_Circular.png`,
    telephone: siteConfig.phone,
    email: siteConfig.contactEmail,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: 'MXN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      ...siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        geoRadius: siteConfig.serviceRadiusMeters,
      },
    ],
    knowsAbout: [
      'Renta de aerocoolers',
      'Renta de calentones',
      'Enfriadores evaporativos',
      'Calentadores de paso a gas',
      'Climatización en Hermosillo',
    ],
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Renta de equipos en Hermosillo',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Renta de aerocoolers en Hermosillo',
            serviceType: 'Renta de enfriadores evaporativos',
          },
          priceCurrency: 'MXN',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: 450,
            maxPrice: 650,
            priceCurrency: 'MXN',
            unitText: 'día',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Renta de calentones en Hermosillo',
            serviceType: 'Renta de calentadores de paso a gas',
          },
          priceCurrency: 'MXN',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: 550,
            priceCurrency: 'MXN',
            unitText: 'día',
          },
        },
      ],
    },
  };
}

/**
 * Schema.org FAQPage a partir de las preguntas frecuentes. El texto debe ser
 * idéntico al que se muestra en la sección visible del sitio.
 */
export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  minPrice: number;
  maxPrice?: number;
};

/**
 * Schema.org Service para cada página de producto (aerocoolers / calentones),
 * vinculado al negocio principal y a la zona de servicio en Hermosillo.
 */
export function serviceSchema(input: ServiceSchemaInput) {
  const priceSpecification =
    input.maxPrice !== undefined
      ? {
          '@type': 'PriceSpecification',
          minPrice: input.minPrice,
          maxPrice: input.maxPrice,
          priceCurrency: 'MXN',
          unitText: 'día',
        }
      : {
          '@type': 'PriceSpecification',
          price: input.minPrice,
          priceCurrency: 'MXN',
          unitText: 'día',
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: input.url,
    provider: {
      '@type': 'HVACBusiness',
      '@id': ORG_ID,
      name: siteConfig.name,
      telephone: siteConfig.phone,
    },
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      priceSpecification,
    },
  };
}
