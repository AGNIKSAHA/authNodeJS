import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { getSessionUserId } from '../../modules/session/session.service.js';


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sessionId: string | undefined = req.cookies?.uid;

  if (!sessionId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userId: Types.ObjectId | null =
    await getSessionUserId(sessionId);

  if (!userId) {
    res.status(401).json({ message: 'Session expired or invalid' });
    return;
  }


  req.userId = userId.toString();

  next();
};
