import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "./user.model.js";
import { signAccessToken, signRefreshToken } from "../../common/utils/jwt.js";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";
import { validateSignupBody, validateLoginBody } from "./user.validation.js";
import { ENV } from "../../common/config/env.js";
import { RefreshTokenModel } from "../token/refreshToken.model.js";
import crypto from "crypto";
import { sendMail } from "../../common/utils/mail.js";
import { asUserDocument } from "./user.helpers.js";
import {
  ForgotPasswordBody,
  ResetPasswordBody,
} from "@modules/user/user.types.js";
import { EMAIL_REGEX } from "../../common/validations/validators.js";

export const handleUserSignup = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!validateSignupBody(req.body)) {
      res.status(400).json({
        message: "Invalid signup body",
      });
      return;
    }

    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  },
);

export const handleUserLogin = catchAsync(async (req, res): Promise<void> => {
  if (!validateLoginBody(req.body)) {
    res.status(400).json({
      message: "Invalid email or password",
    });
    return;
  }

  const { email, password } = req.body;

  const rawUser = await UserModel.findOne({ email }).select("+password").exec();

  if (!rawUser) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const user = asUserDocument(rawUser);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const accessToken = signAccessToken({ userId: user._id.toString() });
  const refreshToken = signRefreshToken({ userId: user._id.toString() });

  const accessExpiryMs = ENV.JWT_ACCESS_EXPIRES_IN * 1000;
  const refreshExpiryMs = ENV.JWT_REFRESH_EXPIRES_IN * 1000;

  await RefreshTokenModel.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + refreshExpiryMs),
  });

  res
    .cookie("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: accessExpiryMs,
    })
    .cookie("refresh_token", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: refreshExpiryMs,
    })
    .status(200)
    .json({ message: "Login successful" });
});

export const handleUserLogout = catchAsync(async (req, res): Promise<void> => {
  const refreshToken = req.cookies?.refresh_token;

  if (refreshToken) {
    await RefreshTokenModel.deleteOne({ token: refreshToken });
  }

  res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});

export const getMe = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      message: "Authenticated",
      userId: req.userId,
    });
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as ForgotPasswordBody;

    if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      res.status(400).json({
        message: "Valid email is required",
      });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "Email does not exist",
      });
      return;
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendMail(
      user.email,
      "Reset your password",
      `
        <p>You requested a password reset.</p>
        <p>
          <a href="${resetURL}">
            Reset Password
          </a>
        </p>
        <p>This link expires in 15 minutes.</p>
      `,
    );

    res.status(200).json({
      message: "Password reset email sent successfully",
    });
  },
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password } = req.body as ResetPasswordBody;

    if (typeof token !== "string") {
      res.status(400).json({ message: "Invalid or missing reset token" });
      return;
    }

    if (typeof password !== "string" || password.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiresAt: { $gt: new Date() },
    }).select("+password");

    if (!user) {
      res.status(400).json({
        message: "Reset token is invalid or has expired",
      });
      return;
    }

    user.password = await bcrypt.hash(password, 12);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  },
);
