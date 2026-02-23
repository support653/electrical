'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Motif1() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 6" />
      <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Motif2() {
  const lineRef = useRef<SVGLineElement>(null);
  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { y: 10 },
      { y: 90, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' }
    );
  }, []);
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1" fill="currentColor" />
      </pattern>
      <rect width="100" height="100" fill="url(#grid)" />
      <line ref={lineRef} x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Motif3() {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      repeat: -1,
      ease: 'power1.inOut',
    });
  }, []);
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      <path
        ref={pathRef}
        d="M0 50 L20 50 L30 20 L40 80 L50 50 L60 50 L70 30 L80 70 L90 50 L100 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const steps = [
  {
    num: '01',
    title: 'Component Sourcing',
    desc: 'Rigorous supplier validation and component traceability to ensure absolute reliability.',
    Motif: Motif1,
  },
  {
    num: '02',
    title: 'Precision Assembly',
    desc: 'Advanced SMT and systems integration executed with Japanese manufacturing discipline.',
    Motif: Motif2,
  },
  {
    num: '03',
    title: 'AOI Verification',
    desc: 'Automated optical inspection and rigorous testing to guarantee zero-defect delivery.',
    Motif: Motif3,
  },
];

export function Protocol() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't scale down

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            endTrigger: cards[i + 1],
            end: 'top top',
            scrub: true,
          }
        });

        tl.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          ease: 'none',
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[i + 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-background">
      {steps.map((step, i) => (
        <div
          key={step.num}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="relative flex items-center justify-center w-full h-screen p-6 overflow-hidden bg-background"
        >
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[80vmin] h-[80vmin]">
              <step.Motif />
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-2xl p-12 text-center bg-white border shadow-xl border-dark/10 rounded-[3rem]">
            <span className="text-xl font-bold tracking-widest text-accent font-data mb-6">
              {step.num}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-dark font-heading mb-6">
              {step.title}
            </h3>
            <p className="text-lg md:text-xl text-dark/70 font-heading">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
