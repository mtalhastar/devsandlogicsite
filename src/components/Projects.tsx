import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

// Project data
const projects = [
  {
    id: 1,
    title: 'TaskFlow SaaS Platform',
    description: 'A comprehensive project management SaaS solution with real-time collaboration features.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    category: ['saas', 'web-app'],
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'HealthTrack MVP',
    description: 'An MVP for a healthcare startup focused on patient engagement and monitoring.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    category: ['mvp', 'mobile-app'],
    technologies: ['Flutter', 'Firebase', 'Node.js']
  },
  {
    id: 3,
    title: 'EcommerceBoost Platform',
    description: 'A scalable e-commerce solution for small businesses with advanced analytics.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    category: ['saas', 'e-commerce'],
    technologies: ['React', 'Express', 'PostgreSQL']
  },
  {
    id: 4,
    title: 'FinTech Dashboard',
    description: 'A comprehensive financial analytics dashboard for a FinTech startup.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    category: ['saas', 'fintech'],
    technologies: ['Vue.js', 'Django', 'PostgreSQL']
  },
  {
    id: 5,
    title: 'EdTech Learning Platform',
    description: 'An interactive learning platform with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80',
    category: ['saas', 'education'],
    technologies: ['React', 'Python', 'TensorFlow']
  },
  {
    id: 6,
    title: 'Real Estate Marketplace MVP',
    description: 'An MVP for a real estate platform connecting buyers and sellers.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
    category: ['mvp', 'web-app'],
    technologies: ['Angular', 'Node.js', 'MongoDB']
  }
];

// Categories for filtering
const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'saas', label: 'SaaS' },
  { value: 'mvp', label: 'MVP' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'education', label: 'Education' }
];

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      layout
      className="group relative overflow-hidden rounded-lg shadow-md bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative h-64">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-none">
                  {tech}
                </Badge>
              ))}
            </div>
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              <Link href={`/projects/${project.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.category.map((cat, index) => (
            <Badge key={index} variant="secondary">{cat}</Badge>
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
    <section className="section px-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore our portfolio of successful SaaS applications and MVPs that have helped businesses grow
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeFilter === category.value ? "default" : "outline"}
              onClick={() => setActiveFilter(category.value)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

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
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
