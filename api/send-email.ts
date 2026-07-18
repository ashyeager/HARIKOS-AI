import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export const config = { runtime: 'nodejs' };

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, company, email, industry, service, goal, budget, description } = payload;

    if (!process.env.RESEND_API_KEY) {
      res.status(200).json({ success: true, skipped: true, message: 'Resend not configured.' });
      return;
    }

    await resend.emails.send({
      from: 'HARIKOS AI <onboarding@resend.dev>',
      to: ['ashyeagerhq@gmail.com'],
      subject: 'New HARIKOS Project Inquiry',
      html: `<h3>New project request received.</h3><p><strong>Name:</strong> ${name}</p><p><strong>Company:</strong> ${company}</p><p><strong>Email:</strong> ${email}</p><p><strong>Industry:</strong> ${industry}</p><p><strong>Service:</strong> ${service}</p><p><strong>Goal:</strong> ${goal}</p><p><strong>Budget:</strong> ${budget || 'Not specified'}</p><p><strong>Description:</strong></p><p>${description}</p>`,
    });

    await resend.emails.send({
      from: 'HARIKOS AI <onboarding@resend.dev>',
      to: [email],
      subject: "We've received your HARIKOS project inquiry",
      html: `<p>Thank you, ${name}.</p><p>We have received your HARIKOS project inquiry and will review it shortly.</p><p>Instagram: @harikos.ai</p><p>Phone: +968 95703688</p><p>Email: ashyeagerhq@gmail.com</p>`,
    });

    res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Email API error:', error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
}
