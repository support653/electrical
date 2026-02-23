'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Button';

gsap.registerPlugin(ScrollTrigger);

export function GetStarted() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.get-started-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center get-started-content bg-white border border-dark/10 rounded-[3rem] p-12 md:p-24 shadow-sm">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-dark font-heading mb-6">
          Ready to scale your production?
        </h2>
        <p className="text-xl text-dark/70 font-heading mb-12 max-w-2xl mx-auto">
          Partner with TOS LANKA for Japanese-quality electronics manufacturing services, from prototype to global delivery.
        </p>
        <Button variant="accent" className="text-xl px-12 py-6">
          Request a Quote
        </Button>
      </div>
    </section>
  );
}
