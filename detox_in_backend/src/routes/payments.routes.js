import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { postPaymentIntent } from '../controllers/payments.controller.js';

const router = Router();

/**
 * @route POST /api/payments/intents
 */
router.post('/intents', requireAuth, postPaymentIntent);

export default router;
