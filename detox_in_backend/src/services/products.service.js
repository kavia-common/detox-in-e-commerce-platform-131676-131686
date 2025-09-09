import { ProductsRepo } from '../repositories/products.repo.js';

// PUBLIC_INTERFACE
export function searchProducts(params) {
  /** Search products with filters and pagination. */
  const { data, total } = ProductsRepo.search(params);
  return { items: data, total, page: params.page, pageSize: params.pageSize };
}

// PUBLIC_INTERFACE
export function getProduct(id) {
  /** Get a single product by id. */
  const p = ProductsRepo.getById(id);
  if (!p) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return p;
}

// PUBLIC_INTERFACE
export function listCategories() {
  /** List available product categories. */
  return ProductsRepo.allCategories();
}
