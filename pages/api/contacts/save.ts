import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

type ResponseData = {
  message: string;
  data?: any;
  error?: string;
};

// Email validation function
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.length > 254) return false;
  if (email.length < 3) return false;
  
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [localPart, domain] = parts;
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (domain.length === 0 || domain.length > 253) return false;
  
  if (!domain.includes('.')) return false;
  
  return emailRegex.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, company, message } = req.body as FormData;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Name, email, and message are required fields.' 
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Invalid email address format.' 
    });
  }

  // Validate field lengths
  if (name.length > 100) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Name cannot exceed 100 characters.' 
    });
  }

  if (message.length > 5000) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Message cannot exceed 5000 characters.' 
    });
  }

  if (phone && phone.length > 20) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Phone number cannot exceed 20 characters.' 
    });
  }

  if (company && company.length > 100) {
    return res.status(400).json({ 
      message: 'Bad Request', 
      error: 'Company name cannot exceed 100 characters.' 
    });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    // Create and save contact message
    const contactMessage = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message.trim(),
    });

    const savedContact = await contactMessage.save();

    return res.status(201).json({ 
      message: 'Contact message saved successfully!',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
      }
    });
  } catch (error: any) {
    console.error('Error saving contact message to database:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((e: any) => e.message).join(', ');
      return res.status(400).json({ 
        message: 'Validation error', 
        error: validationErrors
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate entry', 
        error: 'A contact with this email already exists.' 
      });
    }

    return res.status(500).json({ 
      message: 'Error saving contact message', 
      error: error.message || 'Internal Server Error' 
    });
  }
}

