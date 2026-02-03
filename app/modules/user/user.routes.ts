import { Router } from 'express';

import {
  handleUserSignup,
  handleUserLogin,
   getUserProfile,
   handleUserLogout
} from './user.controller.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';

const router = Router();

router.post('/register', handleUserSignup);
router.post('/login', handleUserLogin);
router.post('/logout', authMiddleware, handleUserLogout);
router.get('/me', authMiddleware, getUserProfile);

export default router;
