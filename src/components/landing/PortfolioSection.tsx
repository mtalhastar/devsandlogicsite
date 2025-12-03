import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { caseStudies } from '@/data/caseStudies';

// Map domain to icon
const domainIcons: Record<string, any> = {
  'Cloud Engineering': Cloud,
  'Full Stack Development': Code,
  'Artificial Intelligence': Brain,
  'FinTech': Shield,
  'Healthcare': Shield,
  'E-Commerce': ShoppingCart,
  'SaaS / Platform Engineering': Server,
  'Logistics': Truck,
};

// Map domain to gradient
const domainGradients: Record<string, string> = {
  'Cloud Engineering': 'from-blue-500 to-cyan-500',
  'Full Stack Development': 'from-purple-500 to-pink-500',
  'Artificial Intelligence': 'from-emerald-500 to-teal-500',
  'FinTech': 'from-blue-500 to-indigo-500',
  'Healthcare': 'from-green-500 to-emerald-500',
  'E-Commerce': 'from-orange-500 to-red-500',
  'SaaS / Platform Engineering': 'from-violet-500 to-purple-500',
  'Logistics': 'from-cyan-500 to-blue-500',
};

// Transform case studies to match component format
const projects = caseStudies.map((study, index) => {
  const Icon = domainIcons[study.domain] || Code;
  const gradient = domainGradients[study.domain] || 'from-purple-500 to-violet-500';
  
  return {
    id: study.id,
    title: study.title,
    shortDesc: study.objective,
    icon: Icon,
    platform: study.keyTechnologies.slice(0, 3).join(', '),
    role: study.role,
    challenge: study.challenge,
    solution: study.solution.map((sol, idx) => ({
      title: `Solution ${idx + 1}`,
      desc: sol
    })),
    technologies: {
      'Technologies': study.keyTechnologies.join(', ')
    },
    outcomes: study.businessOutcome,
    gradient: gradient,
    domain: study.domain,
    image: study.image
  };
});

function ProjectCard({ project, isExpanded, onToggle }) {
  const Icon = project.icon;

  return (
    <motion.div
      layout
      className="rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
    >
      {/* Header - Always visible */}
      <div
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {project.domain && (
                  <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/20 rounded-full border border-blue-500/30">
                    {project.domain}
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                  {project.platform}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm">{project.shortDesc}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300 flex-shrink-0">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
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
        {filteredProjects.length > 0 ? (
          <>
            <div className="space-y-4">
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
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