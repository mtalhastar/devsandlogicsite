import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Loader2 } from 'lucide-react';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

interface CaseStudy {
  id: string;
  title: string;
  short_description: string;
  platform: string;
  role?: string;
  icon: string;
  gradient: string;
  challenge: string;
  solutions: Array<{ title: string; description: string }>;
  technologies: Array<{ category: string; value: string }>;
  outcomes: string[];
  imageUrl?: string;
  is_published: boolean;
  created_date: string;
}

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

// Helper function to derive categories from platform and technologies
const deriveCategories = (platform: string, technologies: Array<{ category: string; value: string }>): string[] => {
  const categories: string[] = [];
  const platformLower = platform.toLowerCase();
  const techValues = technologies.map(t => t.value.toLowerCase()).join(' ');

  if (platformLower.includes('web') || platformLower.includes('frontend') || techValues.includes('react') || techValues.includes('next.js') || techValues.includes('vue') || techValues.includes('angular')) {
    categories.push('frontend');
  }
  if (platformLower.includes('backend') || platformLower.includes('api') || techValues.includes('node') || techValues.includes('express') || techValues.includes('python') || techValues.includes('java')) {
    categories.push('backend');
  }
  if (platformLower.includes('devops') || platformLower.includes('cloud') || techValues.includes('aws') || techValues.includes('azure') || techValues.includes('kubernetes') || techValues.includes('docker')) {
    categories.push('devops');
  }
  if (platformLower.includes('saas') || platformLower.includes('platform')) {
    categories.push('saas');
  }
  if (platformLower.includes('mvp') || platformLower.includes('startup')) {
    categories.push('mvp');
  }
  if (platformLower.includes('mobile') || techValues.includes('react native') || techValues.includes('flutter') || techValues.includes('ios') || techValues.includes('android')) {
    categories.push('mobile-app');
  }
  if (platformLower.includes('fintech') || platformLower.includes('payment') || platformLower.includes('financial')) {
    categories.push('fintech');
  }

  return categories.length > 0 ? categories : ['full-stack'];
};

const ProjectCard = ({ project }: { project: any }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80';
  
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
          src={project.image || defaultImage} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
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
        
        {project.role && (
          <div className="text-sm text-gray-500 mb-3">
            <span>Role: {project.role}</span>
          </div>
        )}
        
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
  // Immediate console log to verify component is being called
  if (typeof window !== 'undefined') {
    console.log('✅ ProjectsPage function called');
  }
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('🚀 ProjectsPage component mounted');
    if (typeof window !== 'undefined') {
      console.log('Current URL:', window.location.href);
    }
    return () => {
      console.log('🛑 ProjectsPage component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('📡 useEffect triggered - starting to fetch case studies');
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Force console output
        console.log('='.repeat(50));
        console.log('🔍 FETCHING CASE STUDIES');
        console.log('='.repeat(50));
        console.log('Fetching case studies from /api/case-studies/get...');
        const response = await fetch('/api/case-studies/get');
        
        console.log('Response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`API returned ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        console.log('Raw API response:', result);
        console.log('Case studies from API:', result.data);
        
        if (!result.data) {
          console.warn('No data field in API response:', result);
          setProjects([]);
          setError('No case studies data received from server');
          return;
        }

        // Filter only published case studies and transform to project format
        const allStudies = result.data || [];
        console.log('All studies count:', allStudies.length);
        console.log('All studies with is_published status:', allStudies.map((s: CaseStudy) => ({
          title: s.title,
          is_published: s.is_published,
          is_published_type: typeof s.is_published
        })));
        
        const publishedStudies = allStudies.filter((study: CaseStudy) => {
          // The API transforms is_published: study.is_published !== false
          // So undefined/null becomes true, false stays false, true stays true
          // We just need to check it's not explicitly false
          const isPublished = study.is_published !== false;
          console.log(`Study "${study.title}": is_published = ${study.is_published} (${typeof study.is_published}), will show = ${isPublished}`);
          return isPublished;
        });
        
        console.log('Published studies count:', publishedStudies.length);

        const transformedProjects = publishedStudies
          .filter((study: CaseStudy) => {
            // Validate required fields
            const hasId = !!study.id;
            const hasTitle = !!study.title;
            const hasDescription = !!study.short_description;
            const hasPlatform = !!study.platform;
            const isValid = hasId && hasTitle && hasDescription && hasPlatform;
            
            if (!isValid) {
              console.warn('Skipping invalid case study:', {
                id: study.id,
                title: study.title,
                short_description: study.short_description,
                platform: study.platform,
                hasId,
                hasTitle,
                hasDescription,
                hasPlatform,
                fullStudy: study
              });
            } else {
              console.log('Valid case study:', study.title);
            }
            return isValid;
          })
          .map((study: CaseStudy) => {
            // Ensure technologies is an array
            const technologies = Array.isArray(study.technologies) ? study.technologies : [];
            console.log(`Transforming "${study.title}":`, {
              technologiesCount: technologies.length,
              technologies: technologies
            });
            
            const categories = deriveCategories(study.platform || '', technologies);
            const techList = technologies.map((t: any) => {
              // Handle both object format {category, value} and string format
              if (typeof t === 'string') {
                return t;
              }
              // Handle Mongoose document format
              if (t && typeof t === 'object') {
                return t.value || t.category || JSON.stringify(t);
              }
              return String(t);
            });

            const transformed = {
              id: study.id,
              title: study.title || 'Untitled Project',
              description: study.short_description || '',
              image: study.imageUrl,
              category: categories,
              technologies: techList,
              role: study.role,
              platform: study.platform || '',
            };
            
            console.log(`Transformed project "${transformed.title}":`, transformed);
            return transformed;
          });

        console.log('Final transformed projects count:', transformedProjects.length);
        console.log('Transformed projects:', transformedProjects);
        
        if (transformedProjects.length === 0 && publishedStudies.length > 0) {
          console.error('WARNING: Projects were filtered out during transformation!');
          console.error('Published studies that were filtered:', publishedStudies);
        }
        
        setProjects(transformedProjects);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching case studies:', err);
        setError(err.message || 'Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter((project: any) => project.category.includes(activeFilter));

  // Log render
  if (typeof window !== 'undefined') {
    console.log('🎨 ProjectsPage rendering, state:', { loading, projectsCount: projects.length, error });
  }

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

            {/* Debug Info - Remove this after debugging */}
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-sm">
              <strong>Debug Info:</strong><br/>
              Component Rendered: ✅<br/>
              Loading: {loading ? 'Yes' : 'No'}<br/>
              Projects: {projects.length}<br/>
              Error: {error || 'None'}<br/>
              Filter: {activeFilter}<br/>
              <button 
                onClick={() => {
                  console.log('Manual fetch triggered');
                  fetch('/api/case-studies/get')
                    .then(r => r.json())
                    .then(d => {
                      console.log('Manual fetch result:', d);
                      alert(`Found ${d.data?.length || 0} case studies`);
                    })
                    .catch(e => {
                      console.error('Manual fetch error:', e);
                      alert('Error: ' + e.message);
                    });
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Test API Manually
              </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-4">Loading projects...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">No projects found{activeFilter !== 'all' ? ` in ${activeFilter} category` : ''}.</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectsPage; 