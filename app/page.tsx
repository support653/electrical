import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Philosophy } from '@/components/Philosophy';
import { Protocol } from '@/components/Protocol';
import { GetStarted } from '@/components/GetStarted';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-dark">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <GetStarted />
      <Footer />
    </main>
  );
}
