import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';
import { localBusinessSchema } from '@/lib/structured-data';

const outfit = localFont({
  src: '../public/fonts/Outfit/Outfit-VariableFont_wght.ttf',
  variable: '--font-outfit',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Renta de Aerocoolers y Calentones en Hermosillo | ClimaXpress',
    template: '%s | ClimaXpress',
  },
  description:
    'Renta de aerocoolers y calentones en Hermosillo, San Carlos y San Pedro el Saucito. Enfriadores evaporativos y calentadores de paso a gas con entrega, instalación profesional y garantía.',
  keywords: [
    'renta de aerocoolers en Hermosillo',
    'renta de calentones en Hermosillo',
    'aerocoolers en renta',
    'calentones en renta',
    'aerocoolers Hermosillo',
    'calentones Hermosillo',
    'renta de aerocoolers',
    'renta de calentones',
    'enfriadores evaporativos Hermosillo',
    'calentadores de paso Hermosillo',
    'aerocooler',
    'calentón de paso',
    'climatización Hermosillo',
    'aire acondicionado evaporativo',
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
    title: 'Renta de Aerocoolers y Calentones en Hermosillo | ClimaXpress',
    description:
      'Renta de aerocoolers y calentones en Hermosillo con entrega, instalación profesional y garantía.',
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
    title: 'Renta de Aerocoolers y Calentones en Hermosillo | ClimaXpress',
    description:
      'Renta de aerocoolers y calentones en Hermosillo con entrega e instalación.',
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
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
