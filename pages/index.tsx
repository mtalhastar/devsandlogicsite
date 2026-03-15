import Head from 'next/head';
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
import { getKeywordsMetaString } from '@/data/keywords';

export default function Home() {
  const keywords = getKeywordsMetaString('/', 35);
  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Devs &amp; Logic | Software Development Agency | SaaS &amp; MVP Development</title>
        <meta name="description" content="Devs & Logic is a software development agency offering custom software development, SaaS & MVP development, web and mobile app development, and dedicated development teams. Hire expert developers." />
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
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