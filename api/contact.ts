export const config = { runtime: 'nodejs' };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, business, email, service, message } = payload;

    if (!name || !business || !email || !service || !message) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    res.status(410).json({ error: 'This endpoint is retired. Submit inquiries through /api/project-requests.' });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ error: 'Failed to process contact request' });
  }
}
