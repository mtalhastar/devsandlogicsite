import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

type ResponseData = {
  message: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const {
    title,
    short_description,
    platform,
    role,
    icon,
    gradient,
    challenge,
    solutions,
    technologies,
    outcomes,
    is_published,
  } = req.body;

  // Validate required fields
  if (!title || !short_description || !platform || !challenge) {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Title, short description, platform, and challenge are required fields.',
    });
  }

  try {
    await connectDB();

    const caseStudy = new CaseStudy({
      title: title.trim(),
      short_description: short_description.trim(),
      platform: platform.trim(),
      role: role?.trim() || undefined,
      icon: icon || 'Cloud',
      gradient: gradient || 'from-blue-500 to-cyan-500',
      challenge: challenge.trim(),
      solutions: solutions || [],
      technologies: technologies || [],
      outcomes: outcomes || [],
      is_published: is_published !== false,
    });

    const savedCaseStudy = await caseStudy.save();

    return res.status(201).json({
      message: 'Case study created successfully',
      data: {
        id: savedCaseStudy._id.toString(),
        title: savedCaseStudy.title,
        platform: savedCaseStudy.platform,
      },
    });
  } catch (error: any) {
    console.error('Error creating case study:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors)
        .map((e: any) => e.message)
        .join(', ');
      return res.status(400).json({
        message: 'Validation error',
        error: validationErrors,
      });
    }

    return res.status(500).json({
      message: 'Error creating case study',
      error: error.message || 'Internal Server Error',
    });
  }
}

