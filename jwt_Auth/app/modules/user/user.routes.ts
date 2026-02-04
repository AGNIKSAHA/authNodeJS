import { Router } from 'express';

import {
  handleUserSignup,
  handleUserLogin,
  getMe,
  handleUserLogout,
  forgotPassword,
  resetPassword
} from './user.controller.js';
import { authMiddleware } from '../../common/middlewares/jwt-auth.middleware.js';

const router = Router();

router.post('/register', handleUserSignup);
router.post('/login', handleUserLogin);


router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, handleUserLogout);

export default router;
