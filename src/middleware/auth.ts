import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: { uid?: string; email?: string };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  req.user = {
    uid: 'supabase-user',
    email: 'user@example.com',
  };
  next();
};
