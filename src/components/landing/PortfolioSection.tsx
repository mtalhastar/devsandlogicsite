import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Cloud,
  Shield,
  ShoppingCart,
  Code,
  Truck,
  CheckCircle,
  Zap,
  Database,
  Server,
  Lock,
  Brain,
  Globe,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Map platform to icon (using platform field from DB)
const platformIcons: Record<string, any> = {
  'AWS': Cloud,
  'Azure': Cloud,
  'GCP': Cloud,
  'Cloud': Cloud,
  'Web': Code,
  'Frontend': Code,
  'Backend': Server,
  'Full Stack': Code,
  'Mobile': Globe,
  'AI': Brain,
  'FinTech': Shield,
  'Healthcare': Shield,
  'E-Commerce': ShoppingCart,
  'SaaS': Server,
  'Platform': Server,
  'Logistics': Truck,
};

// Map platform to gradient
const platformGradients: Record<string, string> = {
  'AWS': 'from-blue-500 to-cyan-500',
  'Azure': 'from-blue-500 to-cyan-500',
  'GCP': 'from-blue-500 to-cyan-500',
  'Cloud': 'from-blue-500 to-cyan-500',
  'Web': 'from-purple-500 to-pink-500',
  'Frontend': 'from-purple-500 to-pink-500',
  'Backend': 'from-violet-500 to-purple-500',
  'Full Stack': 'from-purple-500 to-pink-500',
  'Mobile': 'from-cyan-500 to-blue-500',
  'AI': 'from-emerald-500 to-teal-500',
  'FinTech': 'from-blue-500 to-indigo-500',
  'Healthcare': 'from-green-500 to-emerald-500',
  'E-Commerce': 'from-orange-500 to-red-500',
  'SaaS': 'from-violet-500 to-purple-500',
  'Platform': 'from-violet-500 to-purple-500',
  'Logistics': 'from-cyan-500 to-blue-500',
};

// Helper to get icon from platform
const getIconFromPlatform = (platform: string): any => {
  const platformLower = platform?.toLowerCase() || '';
  for (const [key, icon] of Object.entries(platformIcons)) {
    if (platformLower.includes(key.toLowerCase())) {
      return icon;
    }
  }
  return Code;
};

// Helper to get gradient from platform
const getGradientFromPlatform = (platform: string): string => {
  const platformLower = platform?.toLowerCase() || '';
  for (const [key, gradient] of Object.entries(platformGradients)) {
    if (platformLower.includes(key.toLowerCase())) {
      return gradient;
    }
  }
  return 'from-purple-500 to-violet-500';
};

// Transform database case study to component format
const transformCaseStudy = (study: any) => {
  const Icon = getIconFromPlatform(study.platform);
  const gradient = study.gradient || getGradientFromPlatform(study.platform);
  
  // Extract technologies
  const techList = Array.isArray(study.technologies) 
    ? study.technologies.map((t: any) => typeof t === 'object' ? t.value : t).filter(Boolean)
    : [];
  
  // Use platform as domain for filtering
  const domain = study.platform || 'Other';
  
  return {
    id: study.id,
    title: study.title,
    shortDesc: study.short_description,
    icon: Icon,
    platform: techList.slice(0, 3).join(', ') || study.platform,
    role: study.role || '',
    challenge: study.challenge,
    solution: Array.isArray(study.solutions) 
      ? study.solutions.map((sol: any, idx: number) => ({
          title: typeof sol === 'object' ? sol.title || `Solution ${idx + 1}` : `Solution ${idx + 1}`,
          desc: typeof sol === 'object' ? sol.description : String(sol)
        }))
      : [],
    technologies: {
      'Technologies': techList.join(', ') || study.platform
    },
    outcomes: Array.isArray(study.outcomes) ? study.outcomes : [],
    gradient: gradient,
    domain: domain,
    image: study.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  };
};

function ProjectCard({ project, isExpanded, onToggle }) {
  const Icon = project.icon;

  return (
    <motion.div
      layout
      className="group rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
    >
      {/* Header with Image - Always visible */}
      <div className="cursor-pointer" onClick={onToggle}>
        {/* Image Section */}
        {project.image && (
          <div className="relative h-64 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Floating Icon */}
            <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Platform Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 text-xs font-medium text-white bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                {project.platform}
              </span>
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.shortDesc}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300 flex-shrink-0">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-purple-500/10 pt-6">
              {/* Role */}
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-medium">Role:</span>
                <span className="text-gray-300">{project.role}</span>
              </div>

              {/* Challenge */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  The Challenge
                </h4>
                <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-500" />
                  The Solution
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.solution.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10"
                    >
                      <h5 className="text-purple-400 font-medium mb-2">{item.title}</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  Key Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(project.technologies ?? {}).map(([key, value]) => (
                    <div key={`${project.id}-${key}`} className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <span className="text-purple-400 text-xs uppercase font-medium">{key}: </span>
                      <span className="text-gray-300 text-sm">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                    </div>
                  ))}

                </div>
              </div>

              {/* Business Outcomes */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Business Outcomes
                </h4>
                <div className="space-y-2">
                  {project.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [displayLimit, setDisplayLimit] = useState<number>(5);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch case studies from database
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/case-studies/get');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch case studies');
        }

        // Filter only published case studies and transform
        const publishedStudies = (result.data || []).filter((study: any) => study.is_published !== false);
        const transformedProjects = publishedStudies.map(transformCaseStudy);

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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get unique domains from projects
  const uniqueDomains = Array.from(new Set(projects.map(p => p.domain))).sort();
  
  // Create filter options
  const filterOptions = [
    { value: 'All', label: 'All Projects' },
    ...uniqueDomains.map(domain => ({ value: domain, label: domain }))
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.domain === activeFilter);

  // Reset display limit when filter changes
  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
    setDisplayLimit(5); // Reset to show 5 initially
    setExpandedId(null); // Close any expanded cards
  };

  // Projects to display (limited or all)
  const displayedProjects = filteredProjects.slice(0, displayLimit);
  const hasMoreProjects = filteredProjects.length > displayLimit;
  const showingAll = displayLimit >= filteredProjects.length;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Case Studies & Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Real examples of how we've helped businesses achieve their goals
            with our DevOps and cloud architecture solutions.
          </p>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {filterOptions.map((filter) => (
              <Button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                variant={activeFilter === filter.value ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600 shadow-lg shadow-purple-600/30'
                    : 'bg-purple-600/20 hover:bg-purple-700 text-white border-purple-600 shadow-lg shadow-purple-600/30'
                }`}
              >
                {filter.label}
                {activeFilter === filter.value && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {filter.value === 'All' ? projects.length : filteredProjects.length}
                  </span>
                )}
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            <span className="ml-4 text-gray-400">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="text-white border-purple-600">
              Try Again
            </Button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    isExpanded={expandedId === project.id}
                    onToggle={() => toggleExpand(project.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* See More / Show Less Button */}
            {hasMoreProjects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-8"
              >
                <Button
                  onClick={() => setDisplayLimit(showingAll ? 5 : filteredProjects.length)}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30"
                >
                  {showingAll ? (
                    <>
                      Show Less
                      <ChevronUp className="ml-2 w-5 h-5" />
                    </>
                  ) : (
                    <>
                      See More ({filteredProjects.length - displayLimit} more)
                      <ChevronDown className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found for this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}