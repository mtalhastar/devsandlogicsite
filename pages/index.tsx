import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const IndexPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const el = element as HTMLElement;
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.85) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Devs & Logic | Best MVP & AI SaaS Developers</title>
        <meta name="description" content="Devs & Logic specializes in custom SaaS development and MVP creation. We are the top-rated MVP and SaaS developers with expertise in React, Node.js, and modern web technologies." />
      </Head>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default IndexPage; 