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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    await connectDB();

    const { name, email, role, company, content, rating, imageUrl } = req.body;

    console.log('📥 Received review submission - Full request body:', JSON.stringify(req.body, null, 2));
    console.log('📥 Extracted imageUrl:', imageUrl);
    console.log('📥 imageUrl type:', typeof imageUrl);
    console.log('📥 imageUrl value:', imageUrl);
    console.log('📥 imageUrl length:', imageUrl?.length);

    // Validation
    if (!name || !email || !content || !rating) {
      return res.status(400).json({
        message: 'Missing required fields',
        error: 'Name, email, content, and rating are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Invalid rating',
        error: 'Rating must be between 1 and 5',
      });
    }

    // Create review data object
    const reviewData: any = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role?.trim() || '',
      company: company?.trim() || '',
      content: content.trim(),
      rating: parseInt(rating),
      status: 'pending',
    };

    // Add imageUrl from Cloudinary if it's provided
    console.log('🔍 Checking imageUrl before adding to reviewData:');
    console.log('  - imageUrl exists?', !!imageUrl);
    console.log('  - imageUrl type:', typeof imageUrl);
    console.log('  - imageUrl value:', imageUrl);
    
    if (imageUrl) {
      const trimmedUrl = typeof imageUrl === 'string' ? imageUrl.trim() : String(imageUrl).trim();
      if (trimmedUrl.length > 0) {
        reviewData.imageUrl = trimmedUrl;
        console.log('✅ Adding Cloudinary imageUrl to review data:', reviewData.imageUrl);
        console.log('✅ imageUrl length:', reviewData.imageUrl.length);
      } else {
        console.log('⚠️ imageUrl is empty after trim');
      }
    } else {
      console.log('ℹ️ No imageUrl provided (optional field)');
    }

    console.log('💾 Saving review to database with data:', {
      ...reviewData,
      content: reviewData.content.substring(0, 50) + '...',
      imageUrl: reviewData.imageUrl || 'none'
    });

    console.log('🔍 reviewData before creating Review:', JSON.stringify(reviewData, null, 2));
    
    // Use Review.create() instead of new Review() - it handles all fields better
    // create() accepts a single object and returns a single document
    const review = await Review.create(reviewData) as any;
    
    console.log('✅ Review created using Review.create()');
    console.log('🔍 review.imageUrl (direct):', review.imageUrl);
    console.log('🔍 review.get("imageUrl"):', review.get?.('imageUrl'));
    console.log('🔍 Review object toObject():', JSON.stringify(review.toObject?.(), null, 2));

    // Fetch the saved review to verify what was actually saved
    const savedReview = await Review.findById(review._id);
    console.log('✅ Review saved to database successfully!');
    console.log('📸 Saved review imageUrl from DB:', savedReview?.imageUrl || 'none');
    console.log('📸 Saved review imageUrl type:', typeof savedReview?.imageUrl);
    console.log('🆔 Review ID:', review._id.toString());

    const responseData = {
      id: review._id.toString(),
      name: review.name,
      email: review.email,
      role: review.role,
      company: review.company,
      content: review.content,
      rating: review.rating,
      imageUrl: review.imageUrl || undefined, // Include imageUrl if it exists
      status: review.status,
    };

    console.log('📤 Sending response with data:', {
      ...responseData,
      content: responseData.content.substring(0, 50) + '...',
      imageUrl: responseData.imageUrl || 'none'
    });

    return res.status(201).json({
      message: 'Review submitted successfully',
      data: responseData,
    });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return res.status(500).json({
      message: 'Error creating review',
      error: error.message || 'Internal Server Error',
    });
  }
}

