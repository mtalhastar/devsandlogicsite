import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

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

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Contact ID is required',
    });
  }

  try {
    await connectDB();

    const contact = await Contact.findByIdAndUpdate(
      id,
      { is_read: true },
      { new: true }
    ).select('-__v').lean();

    if (!contact) {
      return res.status(404).json({
        message: 'Not Found',
        error: 'Contact message not found',
      });
    }

    return res.status(200).json({
      message: 'Contact marked as read',
      data: {
        id: contact._id.toString(),
        is_read: contact.is_read,
      },
    });
  } catch (error: any) {
    console.error('Error marking contact as read:', error);
    return res.status(500).json({
      message: 'Error marking contact as read',
      error: error.message || 'Internal Server Error',
    });
  }
}

