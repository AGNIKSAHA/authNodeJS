import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
} from "../utils/jwt.js";
import { RefreshTokenModel } from "../../modules/token/refreshToken.model.js";
import { ENV } from "../config/env.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const accessToken = req.cookies?.access_token;
  const refreshToken = req.cookies?.refresh_token;

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);
      req.userId = payload.userId;
      return next();
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError)) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
    }
  }

  if (!refreshToken) {
    res.status(401).json({ message: "Session expired or Unauthorized" });
    return;
  }

  const storedToken = await RefreshTokenModel.findOne({
    token: refreshToken,
  });

  if (!storedToken) {
    res.status(401).json({ message: "Session expired" });
    return;
  }

  try {
    const refreshPayload = verifyRefreshToken(refreshToken);

    const newAccessToken = signAccessToken({
      userId: refreshPayload.userId,
    });

    res.cookie("access_token", newAccessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: ENV.JWT_ACCESS_EXPIRES_IN * 1000,
    });

    req.userId = refreshPayload.userId;
    return next();
  } catch {
    res.status(401).json({ message: "Session expired" });
  }
};
