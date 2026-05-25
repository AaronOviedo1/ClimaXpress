import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { siteConfig } from '@/lib/site';

const outfit = localFont({
  src: '../public/fonts/Outfit/Outfit-VariableFont_wght.ttf',
  variable: '--font-outfit',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'ClimaXpress | Renta de Aerocoolers y Calentones de Agua',
    template: '%s | ClimaXpress',
  },
  description:
    'Renta e instalación de aerocoolers y calentones de agua a gas. Climatización eficiente y agua caliente al instante. Asesoría, instalación profesional y garantía.',
  keywords: [
    'aerocoolers',
    'aerocooler',
    'calentones',
    'calentones de agua',
    'calentón de paso',
    'calentadores de agua',
    'climatización',
    'aire acondicionado evaporativo',
    'enfriadores de aire',
    'renta de aerocoolers',
    'renta de calentones',
    'instalación de aerocooler',
    'instalación de calentón',
    'ClimaXpress',
  ],
  authors: [{ name: 'ClimaXpress' }],
  creator: 'ClimaXpress',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'ClimaXpress',
    title: 'ClimaXpress | Aerocoolers y Calentones',
    description:
      'Climatización y agua caliente con servicio express. Aerocoolers y calentones con instalación y garantía.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClimaXpress',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClimaXpress | Aerocoolers y Calentones',
    description: 'Climatización y agua caliente con servicio express.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: '/' },
  icons: {
    icon: '/products/LogosinFondo_Circular.png',
    apple: '/products/LogosinFondo_Circular.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1E6FBA',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    image: `${siteConfig.url}/products/LogosinFondo_Circular.png`,
    url: siteConfig.url,
    // TODO: reemplazar con el teléfono real en formato internacional
    telephone: '+52-XXX-XXX-XXXX',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
  };

  return (
    <html lang="es-MX" className={outfit.variable}>
      <body className="min-h-screen bg-ink font-sans text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-sun focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
