import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, company, message } = req.body as FormData;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Bad Request', error: 'Name, email, and message are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender address (appears as "John Doe" <user@example.com>)
    replyTo: email, // So you can reply directly to the user's email
    to: process.env.CONTACT_FORM_RECEIVE_EMAIL, // Your receiving email address from .env.local
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
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Error sending email', 
      error: error.message || 'Internal Server Error' 
    });
  }
} 