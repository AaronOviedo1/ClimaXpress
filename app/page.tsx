import { Hero } from '@/components/sections/Hero';
import { AerocoolersShowcase } from '@/components/sections/AerocoolersShowcase';
import { CalentonesShowcase } from '@/components/sections/CalentonesShowcase';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonios } from '@/components/sections/Testimonios';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AerocoolersShowcase />
      <CalentonesShowcase />
      <HowItWorks />
      <Testimonios />
    </>
  );
}
