
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We Are <span className="gradient-text">Devs & Logic</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              A passionate team of developers and designers building innovative SaaS solutions and MVPs for businesses worldwide.
            </p>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg transform -rotate-2 scale-105 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" 
                alt="Devs & Logic Team"
                className="rounded-lg shadow-xl relative z-10 w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
