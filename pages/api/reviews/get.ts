import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

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

    // Get query parameters for pagination and filtering
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as string; // 'approved', 'pending', 'rejected', or undefined for all

    // Build query
    const query: any = {};
    if (status && ['approved', 'pending', 'rejected'].includes(status)) {
      query.status = status;
    }

    // Get reviews with pagination (or all if no pagination params)
    let reviews;
    if (req.query.page || req.query.limit) {
      reviews = await Review.find(query)
        .sort({ createdAt: -1 }) // Most recent first
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();
    } else {
      // Return all reviews if no pagination
      reviews = await Review.find(query)
        .sort({ createdAt: -1 })
        .select('-__v')
        .lean();
    }

    // Transform data
    const transformedReviews = reviews.map((review: any) => ({
      id: review._id.toString(),
      name: review.name,
      email: review.email,
      role: review.role || '',
      company: review.company || '',
      content: review.content,
      rating: review.rating,
      imageUrl: review.imageUrl || undefined,
      status: review.status,
      created_date: review.createdAt,
    }));

    // Get total count
    const totalCount = await Review.countDocuments(query);

    return res.status(200).json({
      message: 'Reviews retrieved successfully',
      data: transformedReviews,
      count: totalCount,
    });
  } catch (error: any) {
    console.error('Error retrieving reviews:', error);
    return res.status(500).json({
      message: 'Error retrieving reviews',
      error: error.message || 'Internal Server Error',
    });
  }
}

