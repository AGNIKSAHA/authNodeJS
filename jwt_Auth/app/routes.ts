import { Router } from "express";
import userRoutes from "./modules/user/user.routes.js";
import authRoutes from './modules/auth/auth.routes.js';
const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/users", userRoutes);
router.use('/auth', authRoutes);

export default router;
