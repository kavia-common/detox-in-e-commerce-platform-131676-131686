import { getPagination } from '../utils/pagination.js';
import { searchProducts, getProduct, listCategories } from '../services/products.service.js';

// PUBLIC_INTERFACE
export function getProducts(req, res, next) {
  /** List/search products with pagination and filters. Query: q, category, minPrice, maxPrice, page, pageSize */
  try {
    const { page, pageSize, offset } = getPagination(req.query);
    const q = req.query.q || '';
    const category = req.query.category || undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const data = searchProducts({ q, category, minPrice, maxPrice, limit: pageSize, offset, page, pageSize });
    return res.json(data);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function getProductById(req, res, next) {
  /** Get product details by id. */
  try {
    const id = Number(req.params.id);
    const product = getProduct(id);
    return res.json(product);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function getCategories(_req, res, next) {
  /** Get product categories. */
  try {
    const categories = listCategories();
    return res.json({ categories });
  } catch (e) {
    return next(e);
  }
}
