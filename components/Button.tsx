'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'dark';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'accent', className = '', ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const btn = buttonRef.current;
      const bg = bgRef.current;
      if (!btn || !bg) return;

      const handleMouseEnter = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.set(bg, { x, y, scale: 0 });
        gsap.to(bg, {
          scale: 3,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(btn, {
          scale: 1.03,
          duration: 0.3,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        });
      };

      const handleMouseLeave = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(bg, {
          x,
          y,
          scale: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        });
      };

      btn.addEventListener('mouseenter', handleMouseEnter);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    const baseStyles = 'relative overflow-hidden px-8 py-4 rounded-full font-heading font-medium tracking-wide transition-colors duration-300 z-10';
    
    const variants = {
      primary: 'bg-primary text-dark border border-dark/10',
      accent: 'bg-accent text-white',
      dark: 'bg-dark text-white',
    };

    const hoverVariants = {
      primary: 'bg-dark',
      accent: 'bg-dark',
      dark: 'bg-accent',
    };

    return (
      <button
        ref={(node) => {
          // Handle both refs
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        <span
          ref={bgRef}
          className={`absolute block w-10 h-10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 ${hoverVariants[variant]}`}
          style={{ transform: 'scale(0)' }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
