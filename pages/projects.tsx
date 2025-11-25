import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

// Project data
const projects = [
  {
    id: 1,
    title: 'TaskFlow SaaS Platform',
    description: 'A comprehensive project management SaaS solution with real-time collaboration features, task tracking, and detailed analytics. Built for teams that need powerful project management without the complexity.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    category: ['saas', 'frontend', 'backend', 'full-stack'],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    client: 'TechFlow Inc.',
    duration: '6 months'
  },
  {
    id: 2,
    title: 'HealthTrack MVP',
    description: 'An MVP for a healthcare startup focused on patient engagement and monitoring. Features include appointment scheduling, medication reminders, and secure communication with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    category: ['mvp', 'mobile-app', 'frontend'],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Express'],
    client: 'HealthTech Solutions',
    duration: '3 months'
  },
  {
    id: 3,
    title: 'CloudScale Infrastructure',
    description: 'Automated cloud infrastructure setup using Terraform and Kubernetes for high availability and auto-scaling capabilities for a high-traffic media platform.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: ['devops', 'backend'],
    technologies: ['AWS', 'Terraform', 'Kubernetes'],
    client: 'MediaStream',
    duration: '4 months'
  },
  {
    id: 4,
    title: 'FinTech API Gateway',
    description: 'High-performance API gateway processing millions of transactions securely. Implemented advanced rate limiting, authentication, and logging.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    category: ['backend', 'fintech', 'saas'],
    technologies: ['Go', 'gRPC', 'PostgreSQL'],
    client: 'SecurePay',
    duration: '8 months'
  },
  {
    id: 5,
    title: 'Modern E-Commerce UI',
    description: 'A pixel-perfect, responsive e-commerce frontend with advanced filtering, animations, and optimized performance for conversion.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    category: ['frontend', 'e-commerce'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    client: 'FashionNova',
    duration: '3 months'
  },
  {
    id: 6,
    title: 'CI/CD Pipeline Automation',
    description: 'Complete DevOps pipeline automation reducing deployment time by 80% and ensuring consistent environments across development, staging, and production.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
    category: ['devops', 'backend'],
    technologies: ['Jenkins', 'Docker', 'Ansible'],
    client: 'SoftwareHouse',
    duration: '2 months'
  },
  {
    id: 7,
    title: 'HR Management System',
    description: 'A comprehensive HR platform for mid-sized businesses with employee onboarding, time tracking, performance reviews, and automated payroll processing features.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    category: ['saas', 'enterprise', 'full-stack'],
    technologies: ['React', 'Java Spring', 'PostgreSQL', 'Docker'],
    client: 'HR Solutions Pro',
    duration: '9 months'
  },
  {
    id: 8,
    title: 'Event Management Platform',
    description: 'An end-to-end event planning and management platform with ticketing, attendee management, event promotion tools, and post-event analytics for event organizers.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
    category: ['saas', 'service', 'frontend'],
    technologies: ['Next.js', 'Express', 'MongoDB', 'Stripe API'],
    client: 'EventPro Group',
    duration: '6 months'
  }
];

// Categories for filtering
const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'devops', label: 'DevOps' },
  { value: 'saas', label: 'SaaS' },
  { value: 'mvp', label: 'MVP' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'fintech', label: 'FinTech' },
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
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 z-10 transition-colors duration-300"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-[-10px] group-hover:translate-y-0">
           <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-white text-black hover:bg-blue-50 hover:text-blue-600" asChild>
            <Link href={`/projects/${project.id}`} title="View Case Study">
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
        
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <span>Client: {project.client}</span>
          <span>Duration: {project.duration}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {project.technologies.slice(0, 4).map((tech: string, index: number) => (
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
        <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
          {/* Decorative elements */}
           <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl"></div>
           
          <div className="container relative z-10">
            <SectionAnimation className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1">Our Portfolio</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Success Stories & <br/>
                <span className="text-primary">Case Studies</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Explore our portfolio of successful digital products we've built for companies across various industries, from DevOps infrastructure to full-stack SaaS applications.
              </p>
            </SectionAnimation>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section bg-white">
          <div className="container">
            {/* Filter Buttons */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={activeFilter === category.value ? "default" : "outline"}
                    onClick={() => setActiveFilter(category.value)}
                    className={`rounded-full px-6 ${activeFilter === category.value ? 'shadow-md' : 'border-gray-200 text-gray-900 hover:bg-gray-200 hover:text-gray-900'}`}
                  >
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
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectsPage; 