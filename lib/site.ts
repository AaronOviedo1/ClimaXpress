export const siteConfig = {
  name: 'ClimaXpress',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://climaxpress.com',
  tagline: 'Climatización que te refresca, calor que te abraza',
  description:
    'Renta e instalación de aerocoolers y calentones de agua a gas en Hermosillo. Climatización eficiente y agua caliente al instante con entrega, instalación profesional y garantía.',
  // TODO: reemplazar con el número real de WhatsApp en formato internacional sin "+"
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5216621498888',
  // Teléfono en formato internacional E.164 (para schema.org y enlaces tel:).
  phone: '+526621498888',
  phoneDisplay: '+52 662 149 8888',
  // TODO: reemplazar con el email real de contacto
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'climaxpresshmo@gmail.com',
  socials: {
    instagram: 'https://www.instagram.com/climaxpress_/',
    facebook:
      'https://www.facebook.com/profile.php?id=100095197575436',
  },
  // Negocio con zona de servicio (entrega/instalación a domicilio), sin local
  // de cara al público: usamos ciudad/estado reales + coordenadas, sin calle.
  address: {
    addressLocality: 'Hermosillo',
    addressRegion: 'Sonora',
    addressCountry: 'MX',
  },
  // Coordenadas del centro de Hermosillo (referencia de la zona de servicio).
  geo: {
    latitude: 29.0729,
    longitude: -110.9559,
  },
  // Ciudades/localidades donde ClimaXpress entrega e instala.
  areaServed: ['Hermosillo', 'San Carlos', 'San Pedro el Saucito'],
  // Radio de entrega directa en metros (coincide con MAX_KM del cotizador).
  serviceRadiusMeters: 35000,
  priceRange: '$$',
};

export function whatsappLink(message?: string) {
  const text = message ?? 'Hola ClimaXpress, me interesa información sobre la renta de sus equipos';
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
