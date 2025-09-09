import { Router } from 'express';
import { getProducts, getProductById, getCategories } from '../controllers/products.controller.js';

const router = Router();

/**
 * @route GET /api/products
 */
router.get('/', getProducts);

/**
 * @route GET /api/products/categories
 */
router.get('/categories', getCategories);

/**
 * @route GET /api/products/:id
 */
router.get('/:id', getProductById);

export default router;
