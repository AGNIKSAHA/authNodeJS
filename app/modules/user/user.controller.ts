import { Request, Response } from "express";
import { UserModel } from "./user.model.js";
import { UserDocument, SignupBody, LoginBody } from "./user.types.js";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";
import { validateLoginBody } from "./user.validation.js";
import { createSession } from "../session/session.service.js";
import { deleteSession } from '../session/session.service.js';

export const handleUserSignup = catchAsync(
  async (req: Request<{}, {}, SignupBody>, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  },
);


export const handleUserLogin = catchAsync(
  async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
    if (!validateLoginBody(req.body)) {
      res.status(400).json({ message: "Invalid login request body" });
      return;
    }

    const { email, password } = req.body;

    const user: UserDocument | null = await UserModel.findOne({
      email,
      password,
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const sessionId = await createSession(user._id);

    res.cookie("uid", sessionId, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  },
);

export const handleUserLogout = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const sessionId: string | undefined = req.cookies?.uid;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    // Clear cookie
    res.clearCookie('uid', {
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).json({
      message: 'Logout successful',
    });
  }
);



export const getUserProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      message: 'This is a protected route',
    });
  }
);
