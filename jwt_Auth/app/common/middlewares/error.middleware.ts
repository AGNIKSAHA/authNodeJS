import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  res.status(err.statusCode ?? 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
