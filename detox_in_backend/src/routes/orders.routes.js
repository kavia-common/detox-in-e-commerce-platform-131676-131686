import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { postCreateOrder, getMyOrders } from '../controllers/orders.controller.js';

const router = Router();

/**
 * @route POST /api/orders
 */
router.post('/', requireAuth, postCreateOrder);

/**
 * @route GET /api/orders
 */
router.get('/', requireAuth, getMyOrders);

export default router;
