import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

type ResponseData = {
  message: string;
  data?: any[];
  count?: number;
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

    // Get query parameters for pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get case studies with pagination (or all if no pagination params)
    let caseStudies;
    if (req.query.page || req.query.limit) {
      caseStudies = await CaseStudy.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();
    } else {
      // Return all case studies if no pagination
      caseStudies = await CaseStudy.find({})
        .sort({ createdAt: -1 })
        .select('-__v')
        .lean();
    }

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

    // Get total count
    const totalCount = await CaseStudy.countDocuments({});

    return res.status(200).json({
      message: 'Case studies retrieved successfully',
      data: transformedStudies,
      count: totalCount,
    });
  } catch (error: any) {
    console.error('Error retrieving case studies:', error);
    return res.status(500).json({
      message: 'Error retrieving case studies',
      error: error.message || 'Internal Server Error',
    });
  }
}

