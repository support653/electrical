'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function GlobalNodeMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      // Pulse lines
      tl.to('.route-line', { strokeDashoffset: 0, duration: 2, stagger: 0.5, ease: 'power1.inOut' })
        .to('.node-dot', { scale: 1.5, opacity: 1, duration: 0.2, stagger: 0.5 }, "-=2")
        .to('.node-dot', { scale: 1, opacity: 0.5, duration: 0.5, stagger: 0.5 }, "-=1.8")
        .to('.route-line', { opacity: 0, duration: 1 }, "+=1")
        .set('.route-line', { strokeDashoffset: 100, opacity: 1 });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-48 mt-6 p-4 bg-dark rounded-xl flex items-center justify-center relative overflow-hidden">
      <svg ref={svgRef} viewBox="0 0 200 100" className="w-full h-full text-accent">
        {/* Sri Lanka Node */}
        <circle cx="100" cy="80" r="4" fill="currentColor" className="opacity-100" />
        <text x="100" y="95" fill="white" fontSize="8" textAnchor="middle" className="font-data opacity-50">LK</text>
        
        {/* Other Nodes */}
        <circle cx="160" cy="30" r="3" fill="currentColor" className="node-dot opacity-50" style={{ transformOrigin: '160px 30px' }} />
        <text x="160" y="20" fill="white" fontSize="8" textAnchor="middle" className="font-data opacity-50">JP</text>
        
        <circle cx="80" cy="20" r="3" fill="currentColor" className="node-dot opacity-50" style={{ transformOrigin: '80px 20px' }} />
        <text x="80" y="10" fill="white" fontSize="8" textAnchor="middle" className="font-data opacity-50">EU</text>
        
        <circle cx="30" cy="30" r="3" fill="currentColor" className="node-dot opacity-50" style={{ transformOrigin: '30px 30px' }} />
        <text x="30" y="20" fill="white" fontSize="8" textAnchor="middle" className="font-data opacity-50">NA</text>

        {/* Lines */}
        <path d="M100 80 Q130 50 160 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="100" strokeDashoffset="100" className="route-line" />
        <path d="M100 80 Q90 50 80 20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="100" strokeDashoffset="100" className="route-line" />
        <path d="M100 80 Q60 60 30 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="100" strokeDashoffset="100" className="route-line" />
      </svg>
    </div>
  );
}

function SMTConveyor() {
  const pcbRef = useRef<SVGGElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pcbRef.current, 
        { x: -60 }, 
        { x: 200, duration: 3, repeat: -1, ease: 'none' }
      );
    }, pcbRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-48 mt-6 p-4 bg-dark rounded-xl flex flex-col relative overflow-hidden">
      <div className="flex-1 relative flex items-center">
        <svg viewBox="0 0 200 60" className="w-full h-full">
          {/* Conveyor */}
          <line x1="0" y1="40" x2="200" y2="40" stroke="#333" strokeWidth="4" />
          <line x1="0" y1="46" x2="200" y2="46" stroke="#222" strokeWidth="2" />
          
          {/* PCB */}
          <g ref={pcbRef}>
            <rect x="0" y="32" width="40" height="6" fill="#2E4036" stroke="#4a6b58" strokeWidth="1" />
            <rect x="5" y="30" width="8" height="2" fill="#888" />
            <rect x="18" y="30" width="12" height="2" fill="#111" />
            <rect x="34" y="30" width="4" height="2" fill="#888" />
          </g>
          
          {/* Machine Head */}
          <rect x="90" y="0" width="20" height="20" fill="#444" />
          <rect x="98" y="20" width="4" height="10" fill="#E63B2E" />
        </svg>
      </div>
      <div className="font-data text-xs text-primary opacity-70 mt-2 flex items-center">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2" />
        SMT_LINE_01: PLACEMENT ACTIVE
      </div>
    </div>
  );
}

function AOIScanner() {
  const laserRef = useRef<SVGLineElement>(null);
  const chipsRef = useRef<SVGRectElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Reset chips
      tl.set(chipsRef.current, { stroke: '#444' });
      
      // Move laser
      tl.fromTo(laserRef.current, 
        { y: 10 }, 
        { y: 90, duration: 2, ease: 'linear' }
      );
      
      // Highlight chips as laser passes
      chipsRef.current.forEach((chip) => {
        if (!chip) return;
        const chipY = parseInt(chip.getAttribute('y') || '0');
        const delay = (chipY - 10) / 80 * 2; // proportional to laser duration
        tl.to(chip, { stroke: '#E63B2E', duration: 0.1 }, delay);
      });
      
      tl.to(laserRef.current, { opacity: 0, duration: 0.2 });
      tl.set(laserRef.current, { y: 10, opacity: 1 });
      
    }, laserRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-48 mt-6 p-4 bg-white border rounded-xl border-dark/10 shadow-sm flex items-center justify-center relative">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[120px]">
        {/* PCB Base */}
        <rect x="10" y="10" width="80" height="80" fill="#F5F3EE" stroke="#111" strokeWidth="2" rx="4" />
        
        {/* Traces */}
        <path d="M20 20 L40 20 L40 40 M60 80 L60 60 L80 60" fill="none" stroke="#ccc" strokeWidth="1" />
        
        {/* Chips */}
        <rect ref={el => { if(el) chipsRef.current[0] = el }} x="20" y="25" width="15" height="15" fill="#111" stroke="#444" strokeWidth="2" />
        <rect ref={el => { if(el) chipsRef.current[1] = el }} x="60" y="30" width="20" height="10" fill="#111" stroke="#444" strokeWidth="2" />
        <rect ref={el => { if(el) chipsRef.current[2] = el }} x="30" y="60" width="15" height="20" fill="#111" stroke="#444" strokeWidth="2" />
        <rect ref={el => { if(el) chipsRef.current[3] = el }} x="70" y="65" width="10" height="10" fill="#111" stroke="#444" strokeWidth="2" />
        
        {/* Laser */}
        <line ref={laserRef} x1="5" y1="10" x2="95" y2="10" stroke="#E63B2E" strokeWidth="2" filter="drop-shadow(0 0 2px #E63B2E)" />
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
            <GlobalNodeMap />
          </div>

          {/* Card 2 */}
          <div className="feature-card flex flex-col p-8 bg-background border border-dark/10 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-dark">End-to-End EMS Capability</h3>
            <p className="mt-2 text-sm text-dark/60 font-heading">
              Comprehensive solutions from SMT to systems integration and testing.
            </p>
            <SMTConveyor />
          </div>

          {/* Card 3 */}
          <div className="feature-card flex flex-col p-8 bg-background border border-dark/10 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-dark">Inspection-Led Quality</h3>
            <p className="mt-2 text-sm text-dark/60 font-heading">
              ROHS processes, AOI-supported inspection, ISO-aligned systems.
            </p>
            <AOIScanner />
          </div>
        </div>
      </div>
    </section>
  );
}
