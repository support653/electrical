import type {Metadata} from 'next';
import { Space_Grotesk, DM_Serif_Display, Space_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-drama',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-data',
});

export const metadata: Metadata = {
  title: 'TOS LANKA | Precision Electronics Manufacturing',
  description: 'Fully Japanese-owned BOI Section 17 electronics manufacturing services provider in Sri Lanka.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerifDisplay.variable} ${spaceMono.variable}`}>
      <body className="font-heading bg-[#F5F3EE] text-[#111111] antialiased" suppressHydrationWarning>
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05]">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        {children}
      </body>
    </html>
  );
}
