export const config = { runtime: 'nodejs' };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      success: true,
      synced: true,
      message: 'Authentication sync completed.',
    });
  } catch (error) {
    console.error('Auth sync API error:', error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
}
