import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online marketplace with real-time inventory, payments, and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "HealthTech Mobile App",
    description: "Patient management and telemedicine platform with appointment scheduling and video calls.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
    tags: ["React Native", "Firebase", "WebRTC"]
  },
  {
    title: "FinTech Dashboard",
    description: "Advanced trading and portfolio management platform with real-time market data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Next.js", "Python", "AWS"]
  },
  {
    title: "SaaS Analytics Tool",
    description: "Business intelligence platform with custom reporting, data pipelines, and AI insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["Vue.js", "Django", "PostgreSQL"]
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionAnimation>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See What We've Built
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real examples of how we've helped businesses achieve their goals 
            with our tailored digital solutions.
          </p>
          </motion.div>
        </SectionAnimation>

        <SectionAnimation>
          <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </SectionAnimation>
      </div>
    </section>
  );
}