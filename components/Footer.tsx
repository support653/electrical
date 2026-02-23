'use client';

import React from 'react';

export function Footer() {
  return (
    <footer id="contact" className="px-6 pt-24 pb-12 bg-dark rounded-t-[4rem] text-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tighter font-heading mb-4">TOS LANKA</h2>
            <p className="max-w-sm text-background/60 font-heading mb-8">
              Fully Japanese-owned BOI Section 17 electronics manufacturing services provider in Sri Lanka.
            </p>
            <div className="flex items-center gap-3 px-4 py-2 border border-background/20 rounded-full w-fit">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs tracking-widest uppercase font-data text-background/80">
                System Operational
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase font-data text-background/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-heading text-background/80">
              <li>
                <a href="mailto:info@toslanka.com" className="hover:text-accent transition-colors">
                  info@toslanka.com
                </a>
              </li>
              <li>
                <a href="mailto:dexter@toslanka.com" className="hover:text-accent transition-colors">
                  dexter@toslanka.com
                </a>
              </li>
              <li>
                <a href="tel:+94715349933" className="hover:text-accent transition-colors">
                  +94 715 34 99 33
                </a>
              </li>
              <li className="pt-4 text-background/60">
                Block B, BEPZ, Sri Lanka<br />
                Mon-Fri: 8:00am - 7:00pm
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase font-data text-background/40 mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 font-heading text-background/80">
              {['Home', 'About', 'Services', 'Certifications'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 border-t border-background/10 md:flex-row gap-4 font-heading text-sm text-background/40">
          <p>&copy; {new Date().getFullYear()} TOS LANKA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
