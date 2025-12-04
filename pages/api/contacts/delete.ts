import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

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
      error: 'Contact ID is required',
    });
  }

  try {
    await connectDB();

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        message: 'Not Found',
        error: 'Contact message not found',
      });
    }

    return res.status(200).json({
      message: 'Contact message deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({
      message: 'Error deleting contact',
      error: error.message || 'Internal Server Error',
    });
  }
}

