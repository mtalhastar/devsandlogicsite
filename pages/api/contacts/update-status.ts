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
  const { status } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Contact ID is required',
    });
  }

  if (!status || !['Received', 'Progress', 'Done'].includes(status)) {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Valid status (Received, Progress, or Done) is required',
    });
  }

  try {
    await connectDB();

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status, is_read: true }, // Also mark as read when status is updated
      { new: true }
    ).select('-__v').lean();

    if (!contact) {
      return res.status(404).json({
        message: 'Not Found',
        error: 'Contact message not found',
      });
    }

    return res.status(200).json({
      message: 'Contact status updated successfully',
      data: {
        id: contact._id.toString(),
        status: contact.status,
        is_read: contact.is_read,
      },
    });
  } catch (error: any) {
    console.error('Error updating contact status:', error);
    return res.status(500).json({
      message: 'Error updating contact status',
      error: error.message || 'Internal Server Error',
    });
  }
}

