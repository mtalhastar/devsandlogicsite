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
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
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

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Case study ID is required',
    });
  }

  // Validate required fields
  if (!title || !short_description || !platform || !challenge) {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Title, short description, platform, and challenge are required fields.',
    });
  }

  try {
    await connectDB();

    const updateData: any = {
      title: title.trim(),
      short_description: short_description.trim(),
      platform: platform.trim(),
      challenge: challenge.trim(),
      solutions: solutions || [],
      technologies: technologies || [],
      outcomes: outcomes || [],
      is_published: is_published !== false,
    };

    if (role !== undefined) updateData.role = role?.trim() || undefined;
    if (icon) updateData.icon = icon;
    if (gradient) updateData.gradient = gradient;

    const caseStudy = await CaseStudy.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-__v').lean();

    if (!caseStudy) {
      return res.status(404).json({
        message: 'Not Found',
        error: 'Case study not found',
      });
    }

    return res.status(200).json({
      message: 'Case study updated successfully',
      data: {
        id: caseStudy._id.toString(),
        title: caseStudy.title,
      },
    });
  } catch (error: any) {
    console.error('Error updating case study:', error);

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
      message: 'Error updating case study',
      error: error.message || 'Internal Server Error',
    });
  }
}

