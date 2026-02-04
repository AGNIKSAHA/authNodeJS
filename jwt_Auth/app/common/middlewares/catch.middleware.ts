import { Request, Response, NextFunction } from "express";

export type AsyncHandler<T = void> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;

export const catchAsync =
  <T>(fn: AsyncHandler<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
