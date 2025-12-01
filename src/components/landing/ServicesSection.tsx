import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import { 
  Palette, 
  Layout, 
  Smartphone, 
  Code, 
  Database, 
  Bot 
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    description: "Craft unique, eye-catching brands that distinctively elevate your business profile and market presence.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Layout,
    title: "UX/UI Research & Design",
    description: "Develop easy-to-use, engaging interfaces with deep user research to ensure satisfaction and usability.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Development",
    description: "Build reliable digital products meticulously tailored to meet contemporary business needs.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Custom Software Solutions",
    description: "Enterprise-grade custom software development with scalable architecture and robust security.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Database,
    title: "Cloud & DevOps",
    description: "Implement secure cloud infrastructure with CI/CD pipelines and automated deployment workflows.",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    icon: Bot,
    title: "AI Solutions & Automation",
    description: "Integrate advanced AI solutions to automate processes and deliver personalized experiences.",
    gradient: "from-violet-500 to-purple-500"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <SectionAnimation>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Services We Offer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide comprehensive services from tech to design, 
            delivering end-to-end solutions for your digital needs.
          </p>
          </motion.div>
        </SectionAnimation>

        <SectionAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5"
            >
              {/* Icon container */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
          </div>
        </SectionAnimation>
      </div>
    </section>
  );
}