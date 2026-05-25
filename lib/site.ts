export const siteConfig = {
  name: 'ClimaXpress',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://climaxpress.com',
  tagline: 'Climatización que te refresca, calor que te abraza',
  description:
    'Renta e instalación de aerocoolers y calentones de agua a gas. Climatización eficiente y agua caliente al instante con asesoría, instalación profesional y garantía.',
  // TODO: reemplazar con el número real de WhatsApp en formato internacional sin "+"
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '521XXXXXXXXXX',
  // TODO: reemplazar con el email real de contacto
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contacto@climaxpress.com',
  socials: {
    instagram: 'https://www.instagram.com/climaxpress_/',
    facebook:
      'https://www.facebook.com/profile.php?id=100095197575436',
  },
  // TODO: reemplazar con la dirección real del negocio
  address: {
    streetAddress: '{{CALLE_Y_NUMERO}}',
    addressLocality: '{{CIUDAD}}',
    addressRegion: '{{ESTADO}}',
    postalCode: '{{CP}}',
    addressCountry: 'MX',
  },
};

export function whatsappLink(message?: string) {
  const text = message ?? 'Hola ClimaXpress, me interesa información sobre la renta de sus equipos';
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
