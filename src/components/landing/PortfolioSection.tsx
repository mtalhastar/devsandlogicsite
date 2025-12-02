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
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "FinTech: Global Active-Active Payment Gateway",
    shortDesc: "Zero-downtime payment processing infrastructure handling 50k+ TPS with PCI-DSS compliance.",
    icon: Cloud,
    platform: "AWS",
    role: "Lead Cloud Architect & DevOps Engineer",
    challenge: "The client, a global payment processor, faced occasional downtime during regional AWS outages and high latency for cross-border transactions. They required a resilient Multi-Region Active-Active architecture where traffic is routed to the nearest healthy region, ensuring instant failover and data consistency.",
    solution: [
      { title: "Architecture", desc: "Implemented a multi-region setup (US-East-1 and EU-West-1) using Route 53 with latency-based routing and health checks to direct traffic." },
      { title: "Data Consistency", desc: "Deployed DynamoDB Global Tables for multi-master replication to ensure transaction records were synced sub-second across regions." },
      { title: "Compute", desc: "Used EKS (Elastic Kubernetes Service) with Karpenter for rapid autoscaling of microservices based on pending pod load." },
      { title: "Security", desc: "Enforced strict network isolation using Transit Gateway and AWS Network Firewall. Implemented mTLS (Mutual TLS) for service-to-service communication using Istio Service Mesh." }
    ],
    technologies: {
      cloud: "AWS (Route 53, EKS, DynamoDB Global Tables, Transit Gateway)",
      devops: "Terraform (Infrastructure as Code), Helm, Istio",
      cicd: "GitHub Actions with OPA (Open Policy Agent) for policy enforcement"
    },
    outcomes: [
      "Achieved 99.999% availability (Five Nines)",
      "Reduced cross-border transaction latency by 40%",
      "Zero downtime recorded during simulated regional failure drills"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Healthcare: HIPAA-Compliant Telemedicine Platform",
    shortDesc: "Secure, compliant microservices architecture supporting 10x concurrent video consultations.",
    icon: Shield,
    platform: "Azure",
    role: "Cloud Security Architect",
    challenge: "A healthcare provider needed to scale their telemedicine app to support 10x concurrent video consultations. Strict HIPAA compliance was non-negotiable, requiring end-to-end encryption, audit trails, and strict data residency controls.",
    solution: [
      { title: "Containerization", desc: "Refactored the monolith into domain-driven microservices (Identity, Appointment, Video, Records) deployed on Azure Kubernetes Service (AKS)." },
      { title: "Security & Compliance", desc: "Implemented Azure Policy to block non-compliant resource creation. Used Azure Key Vault with hardware security modules (HSM) for managing encryption keys." },
      { title: "Networking", desc: "Private Link was used to ensure database traffic (Azure SQL) never traversed the public internet. App Gateway with WAF protected public endpoints." },
      { title: "Observability", desc: "Centralized logging with Azure Monitor and Sentinel for automated threat detection and compliance reporting." }
    ],
    technologies: {
      cloud: "Azure (AKS, Azure SQL, Private Link, App Gateway, Sentinel)",
      devops: "Azure DevOps Pipelines, Bicep (IaC), SonarQube (Static Analysis)",
      security: "Trivy (Container Scanning), HashiCorp Vault"
    },
    outcomes: [
      "Passed external HIPAA audit with zero critical findings",
      "Reduced infrastructure costs by 25% via auto-scaling rules",
      "Deployment time reduced from 2 weeks to 4 hours"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "E-Commerce: Serverless Event-Driven Inventory System",
    shortDesc: "Highly scalable backend handling 1M+ concurrent users during Flash Sales.",
    icon: ShoppingCart,
    platform: "GCP",
    role: "Senior DevOps Engineer",
    challenge: "The retailer's previous SQL-based inventory system crashed during Black Friday sales due to database locking issues. They needed a non-blocking, asynchronous architecture that scaled to zero during low traffic.",
    solution: [
      { title: "Event-Driven Design", desc: "Leveraged Google Cloud Pub/Sub to decouple the checkout service from the inventory service. Orders are pushed to a queue, processed asynchronously, and confirmed via WebSocket." },
      { title: "Serverless Compute", desc: "Deployed backend logic on Cloud Run (fully managed container environment) to handle massive bursts of HTTP requests instantly." },
      { title: "Database", desc: "Migrated 'hot' inventory data to Redis (Cloud Memorystore) for sub-millisecond reads and Cloud Spanner for globally consistent transaction handling." },
      { title: "IaC Strategy", desc: "Used Terraform modules with a 'GitOps' approach to manage GCP resources." }
    ],
    technologies: {
      cloud: "GCP (Cloud Run, Pub/Sub, Cloud Spanner, Cloud Armor)",
      devops: "Terraform, Docker, Prometheus (managed service)",
      pattern: "CQRS (Command Query Responsibility Segregation)"
    },
    outcomes: [
      "Successfully handled 1.2 million concurrent users during holiday sale",
      "60% reduction in cloud spend compared to VM-based setup",
      "Inventory synchronization errors dropped to near zero"
    ],
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "SaaS: Internal Developer Platform (IDP)",
    shortDesc: "Self-service platform reducing developer onboarding from 5 days to 2 hours.",
    icon: Code,
    platform: "AWS / Kubernetes",
    role: "Platform Engineer",
    challenge: "Developers were spending 30% of their time waiting for Ops to provision environments. The organization needed a 'Golden Path' to allow developers to spin up compliant infrastructure automatically.",
    solution: [
      { title: "GitOps Workflow", desc: "Implemented ArgoCD to sync Kubernetes manifests from Git repositories to clusters automatically." },
      { title: "Self-Service Portal", desc: "Built a customized Backstage portal where developers can request resources (e.g., an S3 bucket or RDS instance)." },
      { title: "Crossplane Integration", desc: "Used Crossplane within Kubernetes to provision cloud resources (AWS RDS, S3) using Kubernetes YAML manifest files, abstracting the cloud complexity from developers." },
      { title: "Ephemeral Environments", desc: "Configured automation to spin up temporary 'preview environments' for every Pull Request, which are destroyed automatically on merge." }
    ],
    technologies: {
      tools: "Kubernetes, ArgoCD, Crossplane, Backstage, Helm",
      cloud: "AWS (underlying provider)",
      methodology: "GitOps, Platform Engineering"
    },
    outcomes: [
      "Developer onboarding time reduced from 5 days to 2 hours",
      "Infrastructure ticket volume dropped by 85%",
      "Deployment frequency increased by 3x"
    ],
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: 5,
    title: "Logistics: Real-Time IoT Fleet Tracking Pipeline",
    shortDesc: "Processing telemetry from 10,000+ trucks to optimize routing and fuel consumption.",
    icon: Truck,
    platform: "AWS IoT",
    role: "Big Data Cloud Architect",
    challenge: "The client was losing data due to connectivity issues and could not process the massive influx of GPS and sensor data (TB/day) fast enough to provide real-time alerts.",
    solution: [
      { title: "Ingestion", desc: "Used AWS IoT Core to securely connect devices via MQTT. Implemented Kinesis Data Streams to buffer high-throughput data." },
      { title: "Processing", desc: "Leveraged Apache Flink (on Amazon EMR) for stateful stream processing (e.g., detecting if a truck idles for >10 mins)." },
      { title: "Storage & Analytics", desc: "'Hot' data was pushed to OpenSearch for real-time dashboards, while 'Cold' data was offloaded to S3 (Parquet format) for historical analysis using Athena." },
      { title: "Edge Computing", desc: "Deployed AWS Greengrass on vehicle gateways to process critical alerts locally (e.g., engine overheating) even when offline." }
    ],
    technologies: {
      cloud: "AWS IoT Core, Kinesis, Lambda, EMR (Flink), OpenSearch",
      devops: "Jenkins, Ansible (for device configuration management)",
      protocol: "MQTT"
    },
    outcomes: [
      "Fuel costs reduced by 12% through optimized route suggestions",
      "Real-time visibility into 99.8% of the fleet assets",
      "Preventative maintenance alerts reduced vehicle breakdowns by 20%"
    ],
    gradient: "from-violet-500 to-purple-500"
  }
];

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
              <div className="flex items-center gap-2 mb-2">
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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real examples of how we've helped businesses achieve their goals
            with our DevOps and cloud architecture solutions.
          </p>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, idx) => (
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
      </div>
    </section>
  );
}