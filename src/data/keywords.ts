/**
 * SEO keyword master list – from devsandlogics_keyword_master_list.html
 * Used for meta keywords and content targeting by page.
 */

export interface KeywordEntry {
  kw: string;
  vol: string;
  diff: 'Low' | 'Medium' | 'High';
  intent: 'Transactional' | 'Commercial' | 'Informational' | 'Navigational';
  cat: string;
  page: string;
}

export const KEYWORD_CATEGORIES: Record<string, string> = {
  'Core Services': '#B5D4F4',
  'SaaS & MVP': '#9FE1CB',
  'Web Dev': '#C0DD97',
  'Mobile': '#FAC775',
  'AI & ML': '#CECBF6',
  'Cloud & DevOps': '#B5D4F4',
  'UI/UX': '#F4C0D1',
  'Tech Stack': '#D3D1C7',
  'Industry Vertical': '#F5C4B3',
  'Hiring': '#FAC775',
  'Pricing': '#C0DD97',
  'Location': '#9FE1CB',
  'Blog / Info': '#FAEEDA',
  'Comparison': '#E6F1FB',
  'Competitor Alt': '#F4C0D1',
};

export const KEYWORDS: KeywordEntry[] = [
  { kw: 'software development agency', vol: '27,100', diff: 'High', intent: 'Transactional', cat: 'Core Services', page: 'Homepage' },
  { kw: 'custom software development company', vol: '8,100', diff: 'High', intent: 'Transactional', cat: 'Core Services', page: 'Homepage' },
  { kw: 'software development company', vol: '40,500', diff: 'High', intent: 'Transactional', cat: 'Core Services', page: 'Homepage' },
  { kw: 'software development services', vol: '18,000', diff: 'High', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'software development outsourcing', vol: '12,000', diff: 'High', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'hire software developers', vol: '6,600', diff: 'High', intent: 'Transactional', cat: 'Core Services', page: 'Contact' },
  { kw: 'offshore software development company', vol: '9,900', diff: 'High', intent: 'Commercial', cat: 'Core Services', page: 'About / Services' },
  { kw: 'IT outsourcing company', vol: '14,800', diff: 'High', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'nearshore software development', vol: '2,900', diff: 'Medium', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'dedicated development team', vol: '4,400', diff: 'Medium', intent: 'Transactional', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'staff augmentation services', vol: '5,400', diff: 'Medium', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'software development partner', vol: '1,600', diff: 'Medium', intent: 'Commercial', cat: 'Core Services', page: 'About' },
  { kw: 'end to end software development', vol: '1,200', diff: 'Low', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'full cycle software development', vol: '880', diff: 'Low', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'custom software development for startups', vol: '1,300', diff: 'Low', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'software development agency for small business', vol: '720', diff: 'Low', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'enterprise software development company', vol: '3,600', diff: 'High', intent: 'Commercial', cat: 'Core Services', page: 'Services Hub' },
  { kw: 'SaaS MVP development', vol: '2,400', diff: 'Medium', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'MVP development company', vol: '1,300', diff: 'Medium', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'SaaS development company', vol: '3,200', diff: 'Medium', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'build SaaS product', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'SaaS application development', vol: '2,200', diff: 'Medium', intent: 'Commercial', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'MVP software development', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'hire SaaS developer', vol: '590', diff: 'Low', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'build MVP for startup', vol: '1,100', diff: 'Low', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'how to build a SaaS MVP', vol: '2,900', diff: 'Low', intent: 'Informational', cat: 'SaaS & MVP', page: 'Blog' },
  { kw: 'SaaS MVP checklist', vol: '720', diff: 'Low', intent: 'Informational', cat: 'SaaS & MVP', page: 'Blog' },
  { kw: 'SaaS product development timeline', vol: '480', diff: 'Low', intent: 'Informational', cat: 'SaaS & MVP', page: 'Blog' },
  { kw: 'SaaS startup development', vol: '1,400', diff: 'Medium', intent: 'Commercial', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'minimum viable product development', vol: '3,600', diff: 'Medium', intent: 'Commercial', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'SaaS MVP agency', vol: '390', diff: 'Low', intent: 'Transactional', cat: 'SaaS & MVP', page: '/services/saas-mvp-development/' },
  { kw: 'web development company', vol: '40,500', diff: 'High', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'web application development company', vol: '8,100', diff: 'High', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'web development agency', vol: '18,000', diff: 'High', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'custom web development services', vol: '6,600', diff: 'Medium', intent: 'Commercial', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'Next.js development company', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'React development agency', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'Node.js development company', vol: '2,900', diff: 'Medium', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'full stack web development company', vol: '3,600', diff: 'Medium', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'web platform development', vol: '1,100', diff: 'Low', intent: 'Commercial', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'progressive web app development', vol: '2,400', diff: 'Medium', intent: 'Commercial', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'ecommerce development company', vol: '14,800', diff: 'High', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'hire web developers', vol: '8,100', diff: 'High', intent: 'Transactional', cat: 'Web Dev', page: '/services/web-development/' },
  { kw: 'mobile app development company', vol: '27,100', diff: 'High', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'iOS app development company', vol: '9,900', diff: 'High', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'Android app development company', vol: '8,100', diff: 'High', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'React Native development company', vol: '3,600', diff: 'Medium', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'cross platform app development', vol: '4,400', diff: 'Medium', intent: 'Commercial', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'hire mobile app developer', vol: '5,400', diff: 'High', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'Flutter app development company', vol: '2,900', diff: 'Medium', intent: 'Transactional', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'mobile app development for startups', vol: '1,300', diff: 'Low', intent: 'Commercial', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'on demand app development', vol: '1,900', diff: 'Medium', intent: 'Commercial', cat: 'Mobile', page: '/services/mobile-app-development/' },
  { kw: 'AI development company', vol: '9,900', diff: 'High', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'AI software development', vol: '3,200', diff: 'Medium', intent: 'Commercial', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'machine learning development company', vol: '2,400', diff: 'Medium', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'ChatGPT integration services', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'LLM integration services', vol: '1,100', diff: 'Medium', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'AI automation agency', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'generative AI development', vol: '2,900', diff: 'Medium', intent: 'Commercial', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'AI integration for business', vol: '1,400', diff: 'Low', intent: 'Commercial', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'AI SaaS development', vol: '880', diff: 'Low', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'build AI powered app', vol: '1,200', diff: 'Low', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'OpenAI API integration', vol: '2,200', diff: 'Low', intent: 'Transactional', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'RPA development company', vol: '1,600', diff: 'Medium', intent: 'Commercial', cat: 'AI & ML', page: '/services/ai-solutions/' },
  { kw: 'DevOps services company', vol: '5,400', diff: 'High', intent: 'Transactional', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'cloud migration services', vol: '8,100', diff: 'High', intent: 'Commercial', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'AWS DevOps services', vol: '2,900', diff: 'Medium', intent: 'Transactional', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'CI/CD pipeline setup', vol: '1,300', diff: 'Low', intent: 'Transactional', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'cloud infrastructure services', vol: '4,400', diff: 'High', intent: 'Commercial', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'DevOps consulting company', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'Kubernetes consulting services', vol: '1,400', diff: 'Medium', intent: 'Transactional', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'cloud native development company', vol: '880', diff: 'Low', intent: 'Commercial', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'serverless architecture development', vol: '720', diff: 'Low', intent: 'Commercial', cat: 'Cloud & DevOps', page: '/services/cloud-devops/' },
  { kw: 'UI UX design agency', vol: '9,900', diff: 'High', intent: 'Transactional', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'UX design company', vol: '6,600', diff: 'High', intent: 'Transactional', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'product design agency', vol: '3,600', diff: 'Medium', intent: 'Transactional', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'SaaS UI design', vol: '1,300', diff: 'Low', intent: 'Commercial', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'mobile UI UX design services', vol: '1,900', diff: 'Medium', intent: 'Commercial', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'branding agency for tech company', vol: '1,100', diff: 'Low', intent: 'Commercial', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'hire UX designer', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'web design and development company', vol: '22,200', diff: 'High', intent: 'Transactional', cat: 'UI/UX', page: '/services/ui-ux-design/' },
  { kw: 'Next.js agency', vol: '1,400', diff: 'Medium', intent: 'Transactional', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'React.js development company', vol: '3,600', diff: 'Medium', intent: 'Transactional', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'Node.js backend development', vol: '1,900', diff: 'Low', intent: 'Commercial', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'TypeScript development services', vol: '880', diff: 'Low', intent: 'Commercial', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'MERN stack development company', vol: '1,300', diff: 'Low', intent: 'Transactional', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'PostgreSQL developer for hire', vol: '590', diff: 'Low', intent: 'Transactional', cat: 'Tech Stack', page: 'Contact' },
  { kw: 'GraphQL API development', vol: '720', diff: 'Low', intent: 'Commercial', cat: 'Tech Stack', page: '/services/web-development/' },
  { kw: 'microservices development company', vol: '1,600', diff: 'Medium', intent: 'Commercial', cat: 'Tech Stack', page: '/services/cloud-devops/' },
  { kw: 'fintech app development company', vol: '2,900', diff: 'Medium', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/fintech/' },
  { kw: 'healthcare software development', vol: '3,600', diff: 'High', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/healthcare/' },
  { kw: 'edtech app development', vol: '1,300', diff: 'Low', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/edtech/' },
  { kw: 'real estate software development', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/real-estate/' },
  { kw: 'logistics software development', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/logistics/' },
  { kw: 'marketplace app development', vol: '2,400', diff: 'Medium', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/' },
  { kw: 'on demand delivery app development', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'Industry Vertical', page: '/industries/' },
  { kw: 'B2B SaaS development company', vol: '1,100', diff: 'Low', intent: 'Transactional', cat: 'Industry Vertical', page: '/services/saas-mvp-development/' },
  { kw: 'hire software development agency', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'Hiring', page: 'Homepage / Contact' },
  { kw: 'hire dedicated software developers', vol: '4,400', diff: 'High', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'hire remote development team', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'hire full stack developer', vol: '8,100', diff: 'High', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'outsource software development', vol: '6,600', diff: 'High', intent: 'Transactional', cat: 'Hiring', page: 'Services Hub' },
  { kw: 'hire React developer', vol: '5,400', diff: 'High', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'hire Node.js developer', vol: '3,600', diff: 'Medium', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'hire AI developer', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'Hiring', page: 'Contact' },
  { kw: 'software development cost', vol: '3,600', diff: 'Medium', intent: 'Informational', cat: 'Pricing', page: 'Blog / Pricing Page' },
  { kw: 'MVP development cost', vol: '2,400', diff: 'Medium', intent: 'Informational', cat: 'Pricing', page: 'Blog / Pricing Page' },
  { kw: 'how much does custom software cost', vol: '2,900', diff: 'Low', intent: 'Informational', cat: 'Pricing', page: 'Blog' },
  { kw: 'web app development cost', vol: '4,400', diff: 'Medium', intent: 'Informational', cat: 'Pricing', page: 'Blog / Pricing Page' },
  { kw: 'mobile app development cost', vol: '9,900', diff: 'Medium', intent: 'Informational', cat: 'Pricing', page: 'Blog / Pricing Page' },
  { kw: 'SaaS development cost', vol: '1,300', diff: 'Low', intent: 'Informational', cat: 'Pricing', page: 'Blog' },
  { kw: 'offshore development cost per hour', vol: '880', diff: 'Low', intent: 'Commercial', cat: 'Pricing', page: 'Blog / Pricing Page' },
  { kw: 'software development company USA', vol: '3,600', diff: 'High', intent: 'Transactional', cat: 'Location', page: 'Location Page' },
  { kw: 'software development company UK', vol: '2,900', diff: 'High', intent: 'Transactional', cat: 'Location', page: 'Location Page' },
  { kw: 'software development company Australia', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'Location', page: 'Location Page' },
  { kw: 'software agency Pakistan', vol: '880', diff: 'Low', intent: 'Transactional', cat: 'Location', page: 'Homepage / About' },
  { kw: 'web development company Dubai', vol: '1,600', diff: 'Medium', intent: 'Transactional', cat: 'Location', page: 'Location Page' },
  { kw: 'software development company Canada', vol: '1,900', diff: 'Medium', intent: 'Transactional', cat: 'Location', page: 'Location Page' },
  { kw: 'best software development companies for startups', vol: '1,900', diff: 'Medium', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'how to find a software development agency', vol: '1,300', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'what is a software development agency', vol: '1,600', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'how to build a web app from scratch', vol: '4,400', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'SaaS vs custom software', vol: '1,100', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'software development process steps', vol: '2,900', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'agile software development for startups', vol: '1,400', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'how to outsource software development', vol: '2,200', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'MVP vs prototype', vol: '1,300', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'microservices vs monolith', vol: '2,400', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'REST API vs GraphQL', vol: '3,600', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'Next.js vs React for SaaS', vol: '1,600', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'DevOps best practices for startups', vol: '1,100', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'custom software vs off the shelf', vol: '1,900', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'how long does it take to build a SaaS', vol: '880', diff: 'Low', intent: 'Informational', cat: 'Blog / Info', page: 'Blog' },
  { kw: 'Toptal alternative', vol: '2,900', diff: 'Medium', intent: 'Commercial', cat: 'Comparison', page: 'Comparison Page' },
  { kw: 'Upwork alternative for software development', vol: '1,300', diff: 'Low', intent: 'Commercial', cat: 'Comparison', page: 'Comparison Page' },
  { kw: 'Clutch software agency comparison', vol: '880', diff: 'Low', intent: 'Commercial', cat: 'Comparison', page: 'Comparison Page' },
  { kw: 'best software development company 2026', vol: '2,200', diff: 'Medium', intent: 'Commercial', cat: 'Comparison', page: 'Blog / Landing' },
  { kw: 'top rated software development agencies', vol: '1,900', diff: 'Medium', intent: 'Commercial', cat: 'Comparison', page: 'Blog / Landing' },
  { kw: 'software development company reviews', vol: '1,600', diff: 'Medium', intent: 'Commercial', cat: 'Comparison', page: 'Portfolio / About' },
  { kw: 'white label software development', vol: '2,200', diff: 'Medium', intent: 'Transactional', cat: 'Competitor Alt', page: 'Services Hub' },
  { kw: 'software development company vs freelancer', vol: '1,100', diff: 'Low', intent: 'Informational', cat: 'Competitor Alt', page: 'Blog' },
  { kw: 'agency vs in house development', vol: '720', diff: 'Low', intent: 'Informational', cat: 'Competitor Alt', page: 'Blog' },
];

/** Map keyword "page" target to Next.js route (for existing pages) */
const PAGE_TO_ROUTE: Record<string, string> = {
  'Homepage': '/',
  'Services Hub': '/',
  'About': '/about',
  'About / Services': '/about',
  'Contact': '/contact',
  'Homepage / Contact': '/contact',
  'Portfolio / About': '/projects',
  'Comparison Page': '/projects',
  'Blog / Landing': '/',
  'Location Page': '/',
  'Homepage / About': '/',
  'Blog': '/',
  'Blog / Pricing Page': '/',
  'Blog / Info': '/',
};

/**
 * Get keyword strings for a given route (for meta keywords).
 * Deduplicates and returns up to maxKeywords.
 */
export function getKeywordsForRoute(route: string, maxKeywords = 30): string[] {
  const normalized = route === '/index' ? '/' : route;
  const keywords: string[] = [];
  const seen = new Set<string>();

  for (const entry of KEYWORDS) {
    const targetRoute = PAGE_TO_ROUTE[entry.page] ?? (entry.page.startsWith('/') ? entry.page : null);
    const matchesRoute = targetRoute === normalized;
    const matchesCareer = normalized === '/career' && (entry.cat === 'Hiring' || entry.page === 'Contact' || entry.page === 'Homepage / Contact');
    if (!matchesRoute && !matchesCareer) continue;
    const kw = entry.kw.trim();
    if (kw && !seen.has(kw.toLowerCase())) {
      seen.add(kw.toLowerCase());
      keywords.push(kw);
      if (keywords.length >= maxKeywords) break;
    }
  }

  return keywords;
}

/**
 * Meta keywords string for use in <meta name="keywords" content="..." />
 */
export function getKeywordsMetaString(route: string, maxKeywords = 30): string {
  return getKeywordsForRoute(route, maxKeywords).join(', ');
}
