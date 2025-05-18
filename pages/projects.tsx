import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Project data
const projects = [
  {
    id: 1,
    title: 'TaskFlow SaaS Platform',
    description: 'A comprehensive project management SaaS solution with real-time collaboration features, task tracking, and detailed analytics. Built for teams that need powerful project management without the complexity.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    category: ['saas', 'web-app'],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    client: 'TechFlow Inc.',
    duration: '6 months'
  },
  {
    id: 2,
    title: 'HealthTrack MVP',
    description: 'An MVP for a healthcare startup focused on patient engagement and monitoring. Features include appointment scheduling, medication reminders, and secure communication with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    category: ['mvp', 'mobile-app'],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Express'],
    client: 'HealthTech Solutions',
    duration: '3 months'
  },
  {
    id: 3,
    title: 'EcommerceBoost Platform',
    description: 'A scalable e-commerce solution for small businesses with advanced analytics, inventory management, and customer relationship tools to drive sales and improve customer retention.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    category: ['saas', 'e-commerce'],
    technologies: ['React', 'Express', 'PostgreSQL', 'Redis'],
    client: 'Retail Solutions Group',
    duration: '8 months'
  },
  {
    id: 4,
    title: 'FinTech Dashboard',
    description: 'A comprehensive financial analytics dashboard for a FinTech startup, providing real-time data visualization, predictive analytics, and secure transaction monitoring for financial institutions.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    category: ['saas', 'fintech'],
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'TensorFlow'],
    client: 'FinEdge Capital',
    duration: '5 months'
  },
  {
    id: 5,
    title: 'EdTech Learning Platform',
    description: 'An interactive learning platform with AI-powered recommendations, course creation tools, student progress tracking, and integrated virtual classrooms for educational institutions.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80',
    category: ['saas', 'education'],
    technologies: ['React', 'Python', 'TensorFlow', 'Flask'],
    client: 'EduSmart Inc.',
    duration: '7 months'
  },
  {
    id: 6,
    title: 'Real Estate Marketplace MVP',
    description: 'An MVP for a real estate platform connecting buyers and sellers with features like property listings, virtual tours, mortgage calculators, and meeting scheduling with agents.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
    category: ['mvp', 'web-app'],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Google Maps API'],
    client: 'PropertyConnect',
    duration: '4 months'
  },
  {
    id: 7,
    title: 'HR Management System',
    description: 'A comprehensive HR platform for mid-sized businesses with employee onboarding, time tracking, performance reviews, and automated payroll processing features.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    category: ['saas', 'enterprise'],
    technologies: ['React', 'Java Spring', 'PostgreSQL', 'Docker'],
    client: 'HR Solutions Pro',
    duration: '9 months'
  },
  {
    id: 8,
    title: 'Event Management Platform',
    description: 'An end-to-end event planning and management platform with ticketing, attendee management, event promotion tools, and post-event analytics for event organizers.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
    category: ['saas', 'service'],
    technologies: ['Next.js', 'Express', 'MongoDB', 'Stripe API'],
    client: 'EventPro Group',
    duration: '6 months'
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
  { value: 'education', label: 'Education' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'service', label: 'Service Industry' }
];

const ProjectCard = ({ project }: { project: any }) => {
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
              <Link href={`/projects/${project.id}`}>View Case Study</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <span>Client: {project.client}</span>
          <span>Duration: {project.duration}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.category.map((cat: string, index: number) => (
            <Badge key={index} variant="secondary">{cat}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter((project: any) => project.category.includes(activeFilter));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Our Projects | Devs & Logic | SaaS & MVP Portfolio</title>
        <meta name="description" content="Explore our portfolio of successful SaaS applications and MVPs. See how Devs & Logic has helped businesses grow with custom software solutions." />
      </Head>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
              <p className="text-lg md:text-xl text-gray-700">
                Explore our portfolio of successful digital products we've built for companies across various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section bg-white">
          <div className="container">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
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
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectsPage; 