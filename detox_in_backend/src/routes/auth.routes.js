import { Router } from 'express';
import { postRegister, postLogin, postLogout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * @route POST /api/auth/register
 */
router.post('/register', postRegister);

/**
 * @route POST /api/auth/login
 */
router.post('/login', postLogin);

/**
 * @route POST /api/auth/logout
 */
router.post('/logout', requireAuth, postLogout);

export default router;
