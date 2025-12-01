import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';

const clients = [
  "TechCorp", "InnovateCo", "StartupX", "DigitalWave", 
  "CloudNine", "DataFlow", "AppMaster", "CodeBase"
];

export default function ClientsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionAnimation className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Companies We Worked With
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've partnered with innovative companies across various industries,
            delivering exceptional development solutions.
          </p>
        </SectionAnimation>

        {/* Scrolling logos - First row */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 items-center"
            >
              {[...clients, ...clients, ...clients].map((client, idx) => (
                  <div
                    key={`${client}-${idx}`}
                  className="flex-shrink-0 px-8 py-4 rounded-xl bg-purple-500/5 border border-purple-500/10 backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300"
                >
                  <span className="text-xl font-semibold text-gray-400 whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scrolling logos - Second row (reverse) */}
        <div className="relative mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 items-center"
            >
              {[...clients.slice().reverse(), ...clients, ...clients].map((client, idx) => (
                  <div
                    key={`${client}-${idx}`}
                  className="flex-shrink-0 px-8 py-4 rounded-xl bg-violet-500/5 border border-violet-500/10 backdrop-blur-sm hover:bg-violet-500/10 transition-all duration-300"
                >
                  <span className="text-xl font-semibold text-gray-400 whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}