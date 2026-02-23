'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Button';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'bg-background/80 backdrop-blur-xl border-dark/10 shadow-sm text-dark',
        },
        onEnter: () => {
          gsap.to(navRef.current, {
            color: '#111111',
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            color: '#F5F3EE',
            duration: 0.3,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        className="flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-colors duration-300 border border-transparent rounded-full text-background"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter font-heading">TOS LANKA</span>
        </div>
        
        <div className="items-center hidden gap-8 md:flex">
          {['About', 'Services', 'Certifications', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm tracking-wide transition-transform duration-300 font-heading hover:-translate-y-px"
            >
              {item}
            </a>
          ))}
        </div>

        <Button variant="accent" className="px-6 py-2 text-sm">
          Request a Quote
        </Button>
      </nav>
    </header>
  );
}
