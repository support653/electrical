'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './Button';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLSpanElement | HTMLDivElement)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-end w-full h-[100dvh] pb-24 md:pb-32 px-6 overflow-hidden bg-dark"
    >
      <div
        className="absolute inset-0 bg-center bg-cover opacity-60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-6">
        <div className="flex flex-col">
          <span
            ref={(el) => {
              if (el) textRefs.current[0] = el;
            }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-background font-heading uppercase"
          >
            Engineer the
          </span>
          <span
            ref={(el) => {
              if (el) textRefs.current[1] = el;
            }}
            className="text-6xl md:text-8xl lg:text-[12rem] leading-[0.8] text-accent font-drama italic pr-4"
          >
            Precision.
          </span>
        </div>

        <div
          ref={(el) => {
            if (el) textRefs.current[2] = el;
          }}
          className="max-w-xl mt-4 text-lg md:text-xl text-background/80 font-heading"
        >
          Fully Japanese-owned BOI Section 17 electronics manufacturing services provider in Sri Lanka, specializing in high-quality PCB assembly and end-to-end electronics manufacturing for global partners.
        </div>

        <div
          ref={(el) => {
            if (el) textRefs.current[3] = el;
          }}
          className="mt-8"
        >
          <Button variant="accent" className="text-lg px-10 py-5">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
