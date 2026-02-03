import { Request, Response } from "express";

import { UserModel } from "./user.model.js";
import { signToken } from "../../common/utils/jwt.js";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";
import { validateLoginBody, validateSignupBody } from "./user.validation.js";
import { ENV } from "../../common/config/env.js";


export const handleUserSignup = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!validateSignupBody(req.body)) {
      res.status(400).json({ message: "Invalid signup body" });
      return;
    }

    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name,
      email,
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


export const handleUserLogin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!validateLoginBody(req.body)) {
      res.status(400).json({ message: "Invalid login body" });
      return;
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = signToken({ userId: user._id.toString() });

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(ENV.JWT_EXPIRES_IN),
    });

    res.status(200).json({
      message: "Login successful",
    });
  },
);

export const handleUserLogout = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  },
);


export const getMe = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      message: "Authenticated",
      userId: req.userId,
    });
  },
);
