import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

type ResponseData = {
  message: string;
  data?: any[];
  error?: string;
  count?: number;
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
    // Connect to MongoDB
    await connectDB();

    // Get query parameters for pagination and filtering
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const email = req.query.email as string;

    // Build query
    const query: any = {};
    if (email) {
      query.email = email.toLowerCase();
    }

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean(); // Return plain JavaScript objects

    // Get total count
    const totalCount = await Contact.countDocuments(query);

    return res.status(200).json({
      message: 'Contacts retrieved successfully',
      data: contacts,
      count: totalCount,
    });
  } catch (error: any) {
    console.error('Error retrieving contacts from database:', error);
    return res.status(500).json({
      message: 'Error retrieving contacts',
      error: error.message || 'Internal Server Error',
    });
  }
}

