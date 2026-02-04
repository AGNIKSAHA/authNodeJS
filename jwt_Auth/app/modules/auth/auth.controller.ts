import { Request, Response } from 'express';
import { signAccessToken, signRefreshToken } from '../../common/utils/jwt.js';
import { ENV } from '../../common/config/env.js';
import { RefreshTokenModel } from '../token/refreshToken.model.js';

export const googleAuthSuccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as { _id: string };

  const accessToken = signAccessToken({ userId: user._id });
  const refreshToken = signRefreshToken({ userId: user._id });

  await RefreshTokenModel.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + ENV.JWT_REFRESH_EXPIRES_IN * 1000),
  });

  res
    .cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: ENV.NODE_ENV === 'production',
      maxAge: ENV.JWT_ACCESS_EXPIRES_IN * 1000,
    })
    .cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: ENV.NODE_ENV === 'production',
      maxAge: ENV.JWT_REFRESH_EXPIRES_IN * 1000,
    })
    .redirect(`${process.env.FRONTEND_URL}/login-success`);
};
