'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/cn';

type Props = {
  speed?: number;
  className?: string;
  children: React.ReactNode;
  ariaHidden?: boolean;
};

export function ParallaxLayer({
  speed = -30,
  className,
  children,
  ariaHidden = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = el.closest('[data-parallax-root]') as HTMLElement | null;
    gsap.to(el, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === (trigger ?? el)) st.kill();
      });
    };
  }, { scope: ref });

  return (
    <div ref={ref} aria-hidden={ariaHidden} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
