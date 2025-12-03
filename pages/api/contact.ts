import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
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
  error?: string;
};

// Email validation function
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // RFC 5322 compliant email regex (simplified but effective)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional checks
  if (email.length > 254) return false; // Max email length
  if (email.length < 3) return false; // Min email length
  
  // Check for valid domain structure
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [localPart, domain] = parts;
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (domain.length === 0 || domain.length > 253) return false;
  
  // Check domain has at least one dot
  if (!domain.includes('.')) return false;
  
  // Check for valid characters
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

  // Validate form data
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Bad Request', error: 'Name, email, and message are required.' });
  }

  // Validate user email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Bad Request', error: 'Invalid email address format.' });
  }

  // Validate environment variables
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing email configuration. Please set GMAIL_EMAIL and GMAIL_APP_PASSWORD in your environment variables.');
    return res.status(500).json({ 
      message: 'Server configuration error', 
      error: 'Email service is not properly configured.' 
    });
  }

  // Validate Gmail email format
  if (!isValidEmail(process.env.GMAIL_EMAIL)) {
    console.error('Invalid GMAIL_EMAIL format in environment variables.');
    return res.status(500).json({ 
      message: 'Server configuration error', 
      error: 'Invalid Gmail email configuration.' 
    });
  }

  // Determine receiver email - validate if provided, otherwise use GMAIL_EMAIL
  let receiverEmail = process.env.GMAIL_EMAIL;
  if (process.env.CONTACT_FORM_RECEIVE_EMAIL) {
    if (isValidEmail(process.env.CONTACT_FORM_RECEIVE_EMAIL)) {
      receiverEmail = process.env.CONTACT_FORM_RECEIVE_EMAIL;
    } else {
      console.warn('Invalid CONTACT_FORM_RECEIVE_EMAIL format. Using GMAIL_EMAIL as fallback.');
    }
  }

  // Use receiver email as sender email if it's valid and different from GMAIL_EMAIL
  // Note: Gmail requires authentication, so we still authenticate with GMAIL_EMAIL
  // but can set the "from" address to receiverEmail if it's a valid Gmail account
  const senderEmail = isValidEmail(receiverEmail) && receiverEmail !== process.env.GMAIL_EMAIL 
    ? receiverEmail 
    : process.env.GMAIL_EMAIL;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL, // Always authenticate with GMAIL_EMAIL
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: senderEmail, // Use validated receiver email as sender if valid
    replyTo: email, // So you can reply directly to the user's email
    to: receiverEmail, // Send to validated receiver email
    subject: `New Contact Form Submission from ${name}${company ? ` (${company})` : ''}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${message}</p>
      </div>
    `,
  };

  try {
    // Connect to MongoDB
    await connectDB();

    // Save contact message to database
    const contactMessage = new Contact({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      message,
    });

    await contactMessage.save();

    // Send email notification
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError: any) {
      // Log email error but don't fail the request since message is saved to DB
      console.error('Error sending email (message saved to database):', emailError);
    }

    return res.status(200).json({ message: 'Message received and saved successfully!' });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    
    // If it's a validation error from MongoDB, return a more specific message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: Object.values(error.errors).map((e: any) => e.message).join(', ')
      });
    }

    return res.status(500).json({ 
      message: 'Error processing request', 
      error: error.message || 'Internal Server Error' 
    });
  }
} 