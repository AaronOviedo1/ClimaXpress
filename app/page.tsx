import { Hero } from '@/components/sections/Hero';
import { AerocoolersShowcase } from '@/components/sections/AerocoolersShowcase';
import { CalentonesShowcase } from '@/components/sections/CalentonesShowcase';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Cotizador } from '@/components/sections/Cotizador';
import { Faq } from '@/components/sections/Faq';
import { Testimonios } from '@/components/sections/Testimonios';
import { JsonLd } from '@/components/JsonLd';
import { faqPageSchema } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AerocoolersShowcase />
      <CalentonesShowcase />
      <HowItWorks />
      <Cotizador />
      <Faq />
      <Testimonios />
      <JsonLd data={faqPageSchema()} />
    </>
  );
}
