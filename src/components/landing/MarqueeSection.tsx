import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import Marquee from '@/components/ui/marquee';

export default function MarqueeSection() {
  const words = [
    "CRAFTING",
    "INNOVATIVE",
    "DIGITAL",
    "SOLUTIONS",
    "BLENDING",
    "CREATIVITY",
    "WITH",
    "TECHNOLOGY",
    "TO",
    "TRANSFORM",
    "IDEAS",
    "INTO",
    "REALITY"
  ];

  return (
    <section className="py-16 bg-black overflow-hidden relative">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
      
      <SectionAnimation>
        <div className="flex overflow-hidden">
          <Marquee
            items={words}
            direction="left"
            duplicates={3}
            className="w-full"
            renderItem={(word, idx) => (
              <span
                key={`${word}-${idx}`}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold ${
                  idx % 3 === 0
                    ? 'text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text'
                    : 'text-white/20'
                }`}
              >
                {word}
              </span>
            )}
          />
        </div>
      </SectionAnimation>
    </section>
  );
}