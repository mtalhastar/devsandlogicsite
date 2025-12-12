import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

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

  try {
    await connectDB();

    const { id } = req.query;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Review ID is required',
        error: 'Please provide a review ID',
      });
    }

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status',
        error: 'Status must be one of: pending, approved, rejected',
      });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('-__v');

    if (!review) {
      return res.status(404).json({
        message: 'Review not found',
        error: 'The review with the provided ID does not exist',
      });
    }

    return res.status(200).json({
      message: 'Review status updated successfully',
      data: {
        id: review._id.toString(),
        name: review.name,
        email: review.email,
        role: review.role,
        company: review.company,
        content: review.content,
        rating: review.rating,
        imageUrl: review.imageUrl,
        status: review.status,
      },
    });
  } catch (error: any) {
    console.error('Error updating review status:', error);
    return res.status(500).json({
      message: 'Error updating review status',
      error: error.message || 'Internal Server Error',
    });
  }
}

