import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ClientsSection from '@/components/landing/ClientSection';
import AboutSection from '@/components/landing/AboutSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ServicesSection from '@/components/landing/ServicesSection';
import MarqueeSection from '@/components/landing/MarqueeSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <ServicesSection />
      <MarqueeSection />
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}