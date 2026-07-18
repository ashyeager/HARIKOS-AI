import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { runtime: 'nodejs' };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, company, email, industry, service, goal, budget, description, user_id, status = 'New' } = payload;

    if (!name || !company || !email || !industry || !service || !goal || !description) {
      res.status(400).json({ error: 'All required fields must be provided.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project request saved successfully.',
      data: {
        user_id: user_id || null,
        name,
        company,
        email,
        industry,
        service,
        goal,
        budget: budget || null,
        description,
        status,
      },
    });
  } catch (error) {
    console.error('Project request API error:', error);
    res.status(500).json({ error: 'Failed to save project request.' });
  }
}
