export const config = { runtime: 'nodejs' };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, company, industry, service, goal, budget, message, userId } = payload;

    if (!name || !email || !company || !industry || !service || !goal || !message) {
      res.status(400).json({ error: 'All required fields must be provided' });
      return;
    }

    res.status(200).json({
      success: true,
      leadId: `lead_${Date.now()}`,
      message: 'Project inquiry received successfully.',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Lead API error:', error);
    res.status(500).json({ error: 'Failed to process project inquiry' });
  }
}
