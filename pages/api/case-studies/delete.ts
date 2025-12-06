import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

type ResponseData = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Case study ID is required',
    });
  }

  try {
    await connectDB();

    const caseStudy = await CaseStudy.findByIdAndDelete(id);

    if (!caseStudy) {
      return res.status(404).json({
        message: 'Not Found',
        error: 'Case study not found',
      });
    }

    return res.status(200).json({
      message: 'Case study deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting case study:', error);
    return res.status(500).json({
      message: 'Error deleting case study',
      error: error.message || 'Internal Server Error',
    });
  }
}

