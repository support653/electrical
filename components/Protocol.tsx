'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Motif1() {
  const reelRef = useRef<SVGGElement>(null);
  const tapeRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    gsap.to(reelRef.current, { rotation: 360, transformOrigin: "50% 50%", duration: 10, repeat: -1, ease: 'none' });
    gsap.to(tapeRef.current, { strokeDashoffset: -20, duration: 1, repeat: -1, ease: 'none' });
  }, []);
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      {/* Tape */}
      <path ref={tapeRef} d="M50 80 L100 80" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="4 4" />
      {/* Reel */}
      <g ref={reelRef}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="40" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="60" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
      </g>
    </svg>
  );
}

function Motif2() {
  const nozzleRef = useRef<SVGGElement>(null);
  const chipRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(nozzleRef.current, { y: 20, duration: 0.5, ease: 'power2.in' })
      .to(chipRef.current, { opacity: 1, duration: 0.1 })
      .to(nozzleRef.current, { y: 0, duration: 0.5, ease: 'power2.out' })
      .to(nozzleRef.current, { x: 40, duration: 0.5, ease: 'power2.inOut' })
      .to(nozzleRef.current, { y: 30, duration: 0.5, ease: 'power2.in' })
      .to(chipRef.current, { y: 30, x: 40, duration: 0 }) // chip placed
      .to(nozzleRef.current, { y: 0, duration: 0.5, ease: 'power2.out' })
      .to(chipRef.current, { opacity: 0, duration: 0.5 }) // fade out chip to reset
      .to(nozzleRef.current, { x: 0, duration: 0.5, ease: 'power2.inOut' })
      .set(chipRef.current, { x: 0, y: 0 });
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      {/* PCB */}
      <rect x="10" y="70" width="80" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Chip */}
      <rect ref={chipRef} x="25" y="40" width="10" height="4" fill="currentColor" opacity="0" />
      {/* Nozzle */}
      <g ref={nozzleRef}>
        <rect x="20" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="30" width="4" height="10" fill="currentColor" />
      </g>
    </svg>
  );
}

function Motif3() {
  const scanRef = useRef<SVGLineElement>(null);
  
  useEffect(() => {
    gsap.fromTo(scanRef.current, 
      { attr: { x1: 10, x2: 10 } }, 
      { attr: { x1: 90, x2: 90 }, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' }
    );
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-20">
      {/* PCB Grid */}
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="20" width="15" height="15" fill="currentColor" />
      <rect x="60" y="25" width="20" height="10" fill="currentColor" />
      <rect x="30" y="60" width="15" height="20" fill="currentColor" />
      <rect x="70" y="65" width="10" height="10" fill="currentColor" />
      {/* Scanner */}
      <line ref={scanRef} x1="10" y1="5" x2="10" y2="95" stroke="currentColor" strokeWidth="4" />
      <polygon points="50,0 60,10 40,10" fill="currentColor" opacity="0.5" />
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
