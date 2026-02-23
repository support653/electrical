'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, title: '25+ Years Experience', desc: 'Proven track record in global delivery.' },
    { id: 2, title: 'Japanese Discipline', desc: 'Fully owned and trained by Japanese holding company.' },
    { id: 3, title: 'Global Delivery', desc: 'Supplying Japan, Europe, North America, and Scandinavia.' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 mt-6">
      {cards.map((card, index) => {
        const isTop = index === 0;
        const isMiddle = index === 1;
        const isBottom = index === 2;

        return (
          <div
            key={card.id}
            className="absolute w-full p-4 transition-all duration-700 bg-white border rounded-xl border-dark/10 shadow-sm"
            style={{
              top: isTop ? 0 : isMiddle ? 16 : 32,
              scale: isTop ? 1 : isMiddle ? 0.95 : 0.9,
              opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
              zIndex: 3 - index,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="text-xs tracking-widest uppercase font-data text-accent mb-2">
              0{card.id}
            </div>
            <h4 className="text-lg font-bold font-heading text-dark">{card.title}</h4>
            <p className="text-sm font-heading text-dark/60 mt-1">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

const messages = [
  'INITIALIZING SMT LINE...',
  'SYSTEMS INTEGRATION: OK',
  'COATING & POTTING: ACTIVE',
  'BGA REWORK: STANDBY',
  'TEST & INSPECTION: RUNNING',
  'PROTOTYPE ASSEMBLY: READY',
];

function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (charIndex < messages[msgIndex].length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setText('');
        setCharIndex(0);
        setMsgIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, msgIndex]);

  return (
    <div className="w-full h-48 mt-6 p-4 bg-dark rounded-xl flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs tracking-widest uppercase font-data text-accent">Live Feed</span>
      </div>
      <div className="font-data text-sm text-primary">
        {'> '}
        {text}
        <span className="inline-block w-2 h-4 ml-1 align-middle bg-accent animate-pulse" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </div>
  );
}

function CursorProtocolScheduler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Reset
      tl.set(cursorRef.current, { x: 0, y: 100, opacity: 0 });
      
      // Enter
      tl.to(cursorRef.current, { x: 50, y: 50, opacity: 1, duration: 0.5, ease: 'power2.out' });
      
      // Move to Wednesday (index 3)
      tl.to(cursorRef.current, { x: 120, y: 30, duration: 0.8, ease: 'power2.inOut' });
      
      // Click
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, onComplete: () => setActiveDay(3) });
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      // Move to Save
      tl.to(cursorRef.current, { x: 180, y: 120, duration: 0.6, ease: 'power2.inOut', delay: 0.5 });
      
      // Click Save
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, onComplete: () => setActiveDay(null) });
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      // Exit
      tl.to(cursorRef.current, { x: 250, y: 150, opacity: 0, duration: 0.5, ease: 'power2.in' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-48 mt-6 p-4 bg-white border rounded-xl border-dark/10 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between w-full mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-md font-data text-xs transition-colors duration-300 ${
                activeDay === i ? 'bg-accent text-white' : 'bg-background text-dark/40'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="w-3/4 h-2 rounded-full bg-background" />
          <div className="w-1/2 h-2 rounded-full bg-background" />
        </div>
      </div>
      
      <div className="self-end px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full font-data bg-dark text-white">
        Save
      </div>

      <svg
        ref={cursorRef}
        className="absolute z-10 w-6 h-6 text-dark drop-shadow-md"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.5"
        style={{ pointerEvents: 'none' }}
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    </div>
  );
}

export function Features() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter font-heading text-dark">
            Interactive Functional Artifacts
          </h2>
          <p className="mt-4 text-lg text-dark/60 font-heading max-w-2xl">
            Precision manufacturing systems designed for reliability and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="feature-card flex flex-col p-8 bg-background border border-dark/10 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-dark">Global Delivery Performance</h3>
            <p className="mt-2 text-sm text-dark/60 font-heading">
              Japanese-owned manufacturing discipline with 25+ years of excellence.
            </p>
            <DiagnosticShuffler />
          </div>

          {/* Card 2 */}
          <div className="feature-card flex flex-col p-8 bg-background border border-dark/10 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-dark">End-to-End EMS Capability</h3>
            <p className="mt-2 text-sm text-dark/60 font-heading">
              Comprehensive solutions from SMT to systems integration and testing.
            </p>
            <TelemetryTypewriter />
          </div>

          {/* Card 3 */}
          <div className="feature-card flex flex-col p-8 bg-background border border-dark/10 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-dark">Inspection-Led Quality</h3>
            <p className="mt-2 text-sm text-dark/60 font-heading">
              ROHS processes, AOI-supported inspection, ISO-aligned systems.
            </p>
            <CursorProtocolScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}
