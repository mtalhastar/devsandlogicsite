import { motion } from 'framer-motion';

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
      
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...words, ...words, ...words].map((word, idx) => (
            <span
              key={idx}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold ${
                idx % 3 === 0 
                  ? 'text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text' 
                  : 'text-white/20'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}