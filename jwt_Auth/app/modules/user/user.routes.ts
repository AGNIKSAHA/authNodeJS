import { Router } from 'express';

import {
  handleUserSignup,
  handleUserLogin,
  getMe,
  handleUserLogout
} from './user.controller.js';
import { jwtAuthMiddleware } from '../../common/middlewares/jwt-auth.middleware.js';

const router = Router();

router.post('/register', handleUserSignup);
router.post('/login', handleUserLogin);

// 🔒 Protected
router.post('/logout', jwtAuthMiddleware, handleUserLogout);
router.get('/me', jwtAuthMiddleware, getMe);

export default router;
