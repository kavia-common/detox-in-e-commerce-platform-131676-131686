import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getMyCart, postAddToCart, patchCartItem, deleteCartItem } from '../controllers/cart.controller.js';

const router = Router();

/**
 * @route GET /api/cart
 */
router.get('/', requireAuth, getMyCart);

/**
 * @route POST /api/cart
 */
router.post('/', requireAuth, postAddToCart);

/**
 * @route PATCH /api/cart/:productId
 */
router.patch('/:productId', requireAuth, patchCartItem);

/**
 * @route DELETE /api/cart/:productId
 */
router.delete('/:productId', requireAuth, deleteCartItem);

export default router;
