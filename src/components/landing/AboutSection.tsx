import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import { Users, Lightbulb, Target, Globe } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: "Client-Centric Approach",
    description: "We prioritize your satisfaction, tailoring our services to meet your specific requirements."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team comprises professionals with expertise across various technologies."
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "We leverage technology to create solutions that address your unique challenges."
  }
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <SectionAnimation>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 font-medium mb-4 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Pioneering Digital Innovation Across{' '}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                30+ Countries
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We're proud to deliver cutting-edge, expert solutions that transform 
              businesses and drive innovation. Our expertise knows no boundaries, 
              enabling us to partner with clients around the world to achieve 
              extraordinary results.
            </p>

            <div className="space-y-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right visual - Globe representation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-spin-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full border border-purple-500/40" />
              
              {/* Center globe */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-purple-600/30 to-violet-600/30 backdrop-blur-sm flex items-center justify-center border border-purple-500/50">
                <Globe className="w-24 h-24 text-purple-400" />
              </div>

              {/* Floating dots representing locations */}
              {[
                { top: '10%', left: '40%' },
                { top: '25%', left: '75%' },
                { top: '45%', left: '85%' },
                { top: '70%', left: '70%' },
                { top: '80%', left: '35%' },
                { top: '55%', left: '10%' },
                { top: '20%', left: '15%' },
              ].map((pos, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-3 h-3 bg-purple-500 rounded-full"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                >
                  <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </SectionAnimation>
      </div>
    </section>
  );
}