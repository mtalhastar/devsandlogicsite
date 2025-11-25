import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { ExternalLink, Github, Layers, Layout, Server, Terminal } from 'lucide-react';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

// Project data
const projects = [
  {
    id: 1,
    title: 'TaskFlow SaaS Platform',
    description: 'A comprehensive project management SaaS solution with real-time collaboration features.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    category: ['saas', 'frontend', 'backend', 'full-stack'],
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 2,
    title: 'HealthTrack MVP',
    description: 'An MVP for a healthcare startup focused on patient engagement and monitoring.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    category: ['mvp', 'mobile-app', 'frontend'],
    technologies: ['Flutter', 'Firebase', 'Node.js'],
    link: '#'
  },
  {
    id: 3,
    title: 'CloudScale Infrastructure',
    description: 'Automated cloud infrastructure setup using Terraform and Kubernetes for high availability.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: ['devops', 'backend'],
    technologies: ['AWS', 'Terraform', 'Kubernetes'],
    link: '#'
  },
  {
    id: 4,
    title: 'FinTech API Gateway',
    description: 'High-performance API gateway processing millions of transactions securely.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    category: ['backend', 'fintech', 'saas'],
    technologies: ['Go', 'gRPC', 'PostgreSQL'],
    link: '#'
  },
  {
    id: 5,
    title: 'Modern E-Commerce UI',
    description: 'A pixel-perfect, responsive e-commerce frontend with advanced filtering and animations.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    category: ['frontend', 'e-commerce'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: '#'
  },
  {
    id: 6,
    title: 'CI/CD Pipeline Automation',
    description: 'Complete DevOps pipeline automation reducing deployment time by 80%.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
    category: ['devops', 'backend'],
    technologies: ['Jenkins', 'Docker', 'Ansible'],
    link: '#'
  }
];

// Categories for filtering
const categories = [
  { value: 'all', label: 'All Projects', icon: Layout },
  { value: 'frontend', label: 'Frontend', icon: Layers },
  { value: 'backend', label: 'Backend', icon: Server },
  { value: 'devops', label: 'DevOps', icon: Terminal },
  { value: 'saas', label: 'SaaS', icon: Layout },
  { value: 'mvp', label: 'MVP', icon: Layout },
];

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div 
      layout
      className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl bg-white border border-gray-100 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 z-10 transition-colors duration-300"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-[-10px] group-hover:translate-y-0">
          <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-white text-black hover:bg-blue-50 hover:text-blue-600" asChild>
            <Link href={`/projects/${project.id}`} title="View Details">
               <ExternalLink className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.category.slice(0, 3).map((cat: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent">
              {cat}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {project.technologies.slice(0, 3).map((tech: string, index: number) => (
            <span key={index} className="text-xs font-medium text-gray-500 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPreview = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  return (
    <section className="section bg-white relative">
       {/* Decorative background */}
       <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container relative z-10">
        <SectionAnimation className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Our Recent Projects</h2>
          <p className="section-subtitle">
            From complex backend systems to stunning frontend interfaces, we deliver excellence across the entire stack.
          </p>
        </SectionAnimation>

        {/* Filter Buttons */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeFilter === category.value ? "default" : "ghost"}
              onClick={() => setActiveFilter(category.value)}
              className={`rounded-full px-6 ${activeFilter === category.value ? 'shadow-md' : 'hover:bg-gray-200 text-gray-600'}`}
            >
              {/* <category.icon className="w-4 h-4 mr-2" /> */}
              {category.label}
            </Button>
          ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View More Button */}
        <FadeIn delay={0.4} className="text-center mt-16">
          <Button size="lg" variant="outline" asChild className="min-w-[200px] border-gray-300 hover:bg-gray-50">
            <Link href="/projects">View Full Portfolio</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default PortfolioPreview;
