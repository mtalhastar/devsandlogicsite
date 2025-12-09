import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { caseStudies } from '@/data/caseStudies';

type ResponseData = {
  message: string;
  added?: number;
  skipped?: number;
  errors?: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    await connectDB();

    let added = 0;
    let skipped = 0;
    const errors: any[] = [];

    // Helper function to map domain to platform
    const domainToPlatform = (domain: string): string => {
      const mapping: Record<string, string> = {
        'FinTech': 'FinTech',
        'Healthcare': 'Healthcare',
        'E-Commerce': 'E-Commerce',
        'SaaS / Platform Engineering': 'SaaS',
        'Logistics': 'Logistics',
        'Cloud Engineering': 'Cloud',
        'Full Stack Development': 'Full Stack',
        'Artificial Intelligence': 'AI',
      };
      return mapping[domain] || domain;
    };

    // Helper function to get icon from domain
    const getIconFromDomain = (domain: string): string => {
      const mapping: Record<string, string> = {
        'FinTech': 'Shield',
        'Healthcare': 'Shield',
        'E-Commerce': 'ShoppingCart',
        'SaaS / Platform Engineering': 'Server',
        'Logistics': 'Truck',
        'Cloud Engineering': 'Cloud',
        'Full Stack Development': 'Code',
        'Artificial Intelligence': 'Brain',
      };
      return mapping[domain] || 'Cloud';
    };

    // Helper function to get gradient from domain
    const getGradientFromDomain = (domain: string): string => {
      const mapping: Record<string, string> = {
        'FinTech': 'from-blue-500 to-indigo-500',
        'Healthcare': 'from-green-500 to-emerald-500',
        'E-Commerce': 'from-orange-500 to-red-500',
        'SaaS / Platform Engineering': 'from-violet-500 to-purple-500',
        'Logistics': 'from-cyan-500 to-blue-500',
        'Cloud Engineering': 'from-blue-500 to-cyan-500',
        'Full Stack Development': 'from-purple-500 to-pink-500',
        'Artificial Intelligence': 'from-emerald-500 to-teal-500',
      };
      return mapping[domain] || 'from-purple-500 to-violet-500';
    };

    // Process each case study
    for (const study of caseStudies) {
      try {
        // Check if case study already exists by title
        const existing = await CaseStudy.findOne({ title: study.title });

        if (existing) {
          console.log(`Skipping "${study.title}" - already exists`);
          skipped++;
          continue;
        }

        // Transform static data format to database format
        const caseStudyData = {
          title: study.title,
          short_description: study.objective,
          platform: domainToPlatform(study.domain),
          role: study.role,
          icon: getIconFromDomain(study.domain),
          gradient: getGradientFromDomain(study.domain),
          challenge: study.challenge,
          solutions: study.solution.map((sol, idx) => ({
            title: `Solution ${idx + 1}`,
            description: sol,
          })),
          technologies: study.keyTechnologies.map((tech) => ({
            category: 'Technology',
            value: tech,
          })),
          outcomes: study.businessOutcome,
          imageUrl: study.image || undefined,
          is_published: true, // Publish all seeded case studies
        };

        const newCaseStudy = new CaseStudy(caseStudyData);
        await newCaseStudy.save();

        console.log(`Added "${study.title}" to database`);
        added++;
      } catch (error: any) {
        console.error(`Error processing "${study.title}":`, error);
        errors.push({
          title: study.title,
          error: error.message || 'Unknown error',
        });
      }
    }

    return res.status(200).json({
      message: `Migration completed: ${added} added, ${skipped} skipped`,
      added,
      skipped,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Error seeding case studies:', error);
    return res.status(500).json({
      message: 'Error seeding case studies',
      errors: [{ error: error.message || 'Internal Server Error' }],
    });
  }
}

