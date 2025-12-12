import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

type ResponseData = {
  message: string;
  data?: any[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    await connectDB();

    // Get all case studies, sorted by creation date (newest first)
    const caseStudies = await CaseStudy.find({})
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // Debug logging
    console.log('📊 Total case studies found in DB:', caseStudies.length);
    caseStudies.forEach((study: any, index: number) => {
      console.log(`Study ${index + 1}:`, {
        id: study._id?.toString(),
        title: study.title,
        is_published: study.is_published,
        platform: study.platform
      });
    });

    // Transform data to match dashboard format
    const transformedStudies = caseStudies.map((study: any) => ({
      id: study._id.toString(),
      title: study.title,
      short_description: study.short_description,
      platform: study.platform,
      role: study.role || '',
      icon: study.icon || 'Cloud',
      gradient: study.gradient || 'from-blue-500 to-cyan-500',
      challenge: study.challenge,
      solutions: study.solutions || [],
      technologies: study.technologies || [],
      outcomes: study.outcomes || [],
      imageUrl: study.imageUrl || undefined,
      is_published: study.is_published !== false,
      created_date: study.createdAt,
    }));

    return res.status(200).json({
      message: 'Case studies retrieved successfully',
      data: transformedStudies,
    });
  } catch (error: any) {
    console.error('Error retrieving case studies:', error);
    return res.status(500).json({
      message: 'Error retrieving case studies',
      error: error.message || 'Internal Server Error',
    });
  }
}

