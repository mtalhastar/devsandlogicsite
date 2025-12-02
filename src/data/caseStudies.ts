export interface CaseStudy {
  id: string;
  title: string;
  domain: string;
  role: string;
  objective: string;
  challenge: string;
  solution: string[]; // short bullet points describing the solution
  keyTechnologies: string[];
  businessOutcome: string[]; // bullet points
  image?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-active-active',
    title: 'Global Active-Active Payment Gateway on AWS',
    domain: 'FinTech',
    role: 'Lead Cloud Architect & DevOps Engineer',
    objective:
      'Design a zero-downtime payment processing infrastructure capable of handling 50k+ TPS while maintaining PCI-DSS compliance.',
    challenge:
      'Regional AWS outages and high latency for cross-border transactions; required Multi-Region Active-Active architecture with instant failover and data consistency.',
    solution: [
      'Multi-region setup (US-East-1 & EU-West-1) using Route53 latency-based routing + health checks',
      'DynamoDB Global Tables for sub-second multi-master replication',
      'EKS + Karpenter for rapid autoscaling',
      'Transit Gateway and AWS Network Firewall for strict network isolation',
      'mTLS (Istio) for service-to-service security',
    ],
    keyTechnologies: ['AWS', 'Route 53', 'EKS', 'DynamoDB Global Tables', 'Transit Gateway', 'Terraform', 'Istio', 'GitHub Actions', 'OPA'],
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&q=80',
    businessOutcome: [
      'Achieved 99.999% availability (Five Nines)',
      'Reduced cross-border latency by 40%',
      'Zero downtime recorded during regional failure drills',
    ],
  },
  {
    id: 'healthcare-telemedicine-azure',
    title: 'HIPAA-Compliant Telemedicine Platform (Azure)',
    domain: 'Healthcare',
    role: 'Cloud Security Architect',
    objective:
      'Migrate a legacy monolith to a secure microservices architecture on Azure to support 10x concurrent video consultations and ensure HIPAA compliance.',
    challenge:
      'Strict HIPAA requirements, end-to-end encryption, audit trails, data residency, and scale for concurrent video consultations.',
    solution: [
      'Refactored monolith into domain-driven microservices on AKS',
      'Azure Policy & Key Vault (HSM) for compliance and key management',
      'Private Link for database traffic, App Gateway + WAF for public endpoints',
      'Centralized logging in Azure Monitor and Sentinel for threat detection',
    ],
    keyTechnologies: ['Azure', 'AKS', 'Azure SQL', 'Private Link', 'App Gateway', 'Sentinel', 'Azure Policy', 'Bicep', 'Azure DevOps'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    businessOutcome: [
      'Passed external HIPAA audit with zero critical findings',
      'Reduced infrastructure cost by 25%',
      'Deployment time reduced from 2 weeks to 4 hours',
    ],
  },
  {
    id: 'ecommerce-serverless-gcp',
    title: 'Serverless Event-Driven Inventory System (GCP)',
    domain: 'E-Commerce',
    role: 'Senior DevOps Engineer',
    objective:
      'Build a scalable, event-driven backend to handle Flash Sale traffic spikes up to 1M+ concurrent users without over-provisioning.',
    challenge:
      'Previous SQL-based inventory system crashed due to locking under high traffic; needed non-blocking async architecture and scaling to zero.',
    solution: [
      'Pub/Sub to decouple checkout and inventory services',
      'Cloud Run for serverless autoscaling containers',
      'Redis (Memorystore) for hot inventory, Cloud Spanner for transactions',
      'Terraform modules + GitOps for IaC',
    ],
    keyTechnologies: ['GCP', 'Cloud Run', 'Pub/Sub', 'Cloud Spanner', 'Cloud Memorystore', 'Terraform', 'Prometheus'],
    image: 'https://images.unsplash.com/photo-1508385082359-f1f4a69b6b54?w=1200&q=80',
    businessOutcome: [
      'Successfully handled 1.2M concurrent users',
      '60% reduction in cloud spend vs previous VM setup',
      'Inventory sync errors dropped near zero',
    ],
  },
  {
    id: 'saaS-idp',
    title: 'Internal Developer Platform (IDP)',
    domain: 'SaaS / Platform Engineering',
    role: 'Platform Engineer',
    objective:
      'Build a self-service internal platform to standardize deployments and reduce developer time to first commit.',
    challenge:
      'Developers were spending time waiting for Ops to provision environments; needed a golden path and self-service.',
    solution: [
      'ArgoCD GitOps to sync manifests automatically',
      'Custom Backstage portal for resource requests',
      'Crossplane to provision cloud resources via Kubernetes manifests',
      'Automated ephemeral preview environments for PRs',
    ],
    keyTechnologies: ['Kubernetes', 'ArgoCD', 'Crossplane', 'Backstage', 'Helm', 'AWS'],
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80',
    businessOutcome: [
      'Developer onboarding reduced from 5 days to 2 hours',
      'Infrastructure ticket volume down 85%',
      'Deployment frequency increased 3x',
    ],
  },
  {
    id: 'logistics-iot-telemetry',
    title: 'Real-Time IoT Fleet Tracking Pipeline',
    domain: 'Logistics',
    role: 'Big Data Cloud Architect',
    objective:
      'Process telemetry from 10,000+ delivery trucks in real-time for routing and fuel optimization.',
    challenge:
      'Connectivity issues, very high throughput TB/day; could not provide real-time alerts.',
    solution: [
      'IoT Core + Kinesis for secure ingestion and buffering',
      'Apache Flink on EMR for stateful stream processing',
      'OpenSearch for hot dashboards and S3 (Parquet) for cold storage + Athena',
      'Edge compute with AWS Greengrass for offline critical alerts',
    ],
    keyTechnologies: ['AWS IoT Core', 'Kinesis', 'EMR (Flink)', 'OpenSearch', 'AWS Greengrass', 'Lambda', 'Jenkins', 'Ansible'],
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80',
    businessOutcome: [
      'Fuel costs reduced by 12% via optimized routing',
      'Real-time visibility to 99.8% of fleet',
      'Preventative alerts reduced breakdowns by 20%',
    ],
  },
];

export default caseStudies;
