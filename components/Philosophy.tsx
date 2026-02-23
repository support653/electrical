'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
      });

      tl.fromTo(
        textRef1.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      ).fromTo(
        textRef2.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-full min-h-[80vh] py-32 px-6 overflow-hidden bg-dark"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-center bg-cover opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2071&auto=format&fit=crop")',
        }}
      />
      <div className="absolute inset-0 bg-dark/60" />

      <div className="relative z-10 flex flex-col items-center max-w-5xl gap-12 mx-auto text-center">
        <div ref={textRef1} className="text-xl md:text-3xl font-heading text-background/70">
          Most electronics manufacturing focuses on: <br className="hidden md:block" />
          <span className="text-background">acceptable failure rates.</span>
        </div>

        <div ref={textRef2} className="text-4xl md:text-6xl lg:text-8xl font-heading text-background leading-tight">
          We focus on:{' '}
          <span className="font-drama italic text-accent block mt-4">
            zero-defect precision.
          </span>
        </div>
      </div>
    </section>
  );
}
