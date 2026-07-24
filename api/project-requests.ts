import type { VercelRequest, VercelResponse } from './types';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = { runtime: 'nodejs' };

const resend = new Resend(process.env.RESEND_API_KEY || '');
const adminEmail = process.env.ADMIN_EMAIL || 'ashyeagerhq@gmail.com';
const fromEmail = process.env.RESEND_FROM_EMAIL || 'HARIKOS AI <onboarding@resend.dev>';

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function buildAdminEmailHtml(payload: Record<string, unknown>) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111827;">
      <h2 style="margin-bottom: 12px;">New HARIKOS Project Inquiry</h2>
      <p>A new project inquiry has been submitted.</p>
      <ul>
        <li><strong>Name:</strong> ${payload.full_name || 'Not provided'}</li>
        <li><strong>Company:</strong> ${payload.company || 'Not provided'}</li>
        <li><strong>Email:</strong> ${payload.email || 'Not provided'}</li>
        <li><strong>Industry:</strong> ${payload.industry || 'Not provided'}</li>
        <li><strong>Service:</strong> ${payload.service || 'Not provided'}</li>
        <li><strong>Budget:</strong> ${payload.budget || 'Not specified'}</li>
        <li><strong>Submission Time:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <p><strong>Project Description:</strong></p>
      <p>${(payload.description as string)?.replace(/\n/g, '<br />') || 'No description provided.'}</p>
    </div>
  `;
}

function buildClientEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <p>Hello ${name},</p>
      <p>Thank you for contacting HARIKOS AI.</p>
      <p>We have successfully received your project inquiry and our team will review it shortly.</p>
      <p>For faster communication, you can also reach us through:</p>
      <p>Instagram: @harikos.ai</p>
      <p>Phone: +968 95703688</p>
      <p>Email: ashyeagerhq@gmail.com</p>
      <p>We look forward to working with you.</p>
      <p>HARIKOS AI</p>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      res.status(503).json({ error: 'Inquiry submissions are temporarily unavailable. Please contact us directly.' });
      return;
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { full_name, email, company, industry, service, budget, description, user_id } = payload;

    if (!full_name || !email || !company || !industry || !service || !description) {
      res.status(400).json({ error: 'All required fields must be provided.' });
      return;
    }

    const inquiry = {
      user_id: user_id || null,
      full_name: full_name.trim(),
      email: email.trim(),
      company: company.trim(),
      industry,
      service,
      budget: budget || null,
      description: description.trim(),
      status: 'New',
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('project_requests').insert(inquiry);
    if (error) {
      console.error('Supabase inquiry insert failed:', error);
      res.status(500).json({ error: 'We could not save your inquiry right now.' });
      return;
    }

    const mailResults: Array<{ success: boolean; message: string }> = [];

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [adminEmail],
          subject: 'New HARIKOS Project Inquiry',
          html: buildAdminEmailHtml(inquiry),
        });
        mailResults.push({ success: true, message: 'Admin email sent.' });
      } catch (emailError) {
        console.error('Failed to send admin inquiry email:', emailError);
        mailResults.push({ success: false, message: 'Admin email could not be sent.' });
      }

      try {
        await resend.emails.send({
          from: fromEmail,
          to: [email.trim()],
          subject: "We've received your HARIKOS AI project inquiry",
          html: buildClientEmailHtml(full_name.trim()),
        });
        mailResults.push({ success: true, message: 'Client confirmation email sent.' });
      } catch (emailError) {
        console.error('Failed to send client confirmation email:', emailError);
        mailResults.push({ success: false, message: 'Client confirmation email could not be sent.' });
      }
    } else {
      console.warn('Resend API key is not configured. Email delivery was skipped.');
      mailResults.push({ success: false, message: 'Email delivery skipped because Resend is not configured.' });
    }

    res.status(200).json({
      success: true,
      message: 'Project inquiry received successfully.',
      emailConfigured: Boolean(process.env.RESEND_API_KEY),
      mailResults,
    });
  } catch (error) {
    console.error('Project request API error:', error);
    res.status(500).json({ error: 'Failed to save project request.' });
  }
}
