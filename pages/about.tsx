import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import AboutHero from '@/components/AboutHero';
import Team from '@/components/Team';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>About Us | Devs & Logic | SaaS & MVP Development Team</title>
        <meta name="description" content="Meet the Devs & Logic team - NYC-based experts in SaaS app development and MVP creation. Learn about our process and how we deliver exceptional digital products." />
      </Head>
      <Header />
      <main>
        <AboutHero />
        
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <SectionAnimation>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Founded in 2015, Devs & Logic was born from a simple vision: to create innovative digital solutions that help businesses thrive in the modern world. What started as a small team of passionate developers has grown into a full-service digital product agency specializing in SaaS applications and MVPs.
                  </p>
                  <p>
                    Based in the heart of New York City's tech scene, we've collaborated with startups, scaleups, and established enterprises across various industries, from fintech and healthcare to education and e-commerce. Our approach combines technical excellence with strategic thinking to deliver products that not only work flawlessly but also drive business growth.
                  </p>
                  <p>
                    We believe that great software is built by great teams. That's why we've assembled a diverse group of talented individuals who bring unique perspectives and specialized skills to every project. Our collaborative environment encourages innovation and continuous learning, ensuring we stay at the forefront of emerging technologies and best practices.
                  </p>
                </div>
              </SectionAnimation>
              
              <FadeIn delay={0.3} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">8+</div>
                  <p className="text-gray-600">Years in Business</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        <Team />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default AboutPage; 