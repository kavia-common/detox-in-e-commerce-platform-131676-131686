import db from '../db/database.js';

export const ProductsRepo = {
  search({ q, category, minPrice, maxPrice, limit, offset }) {
    const where = [];
    const params = [];
    if (q) { where.push('(name LIKE ? OR description LIKE ? OR sku LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
    if (category) { where.push('category = ?'); params.push(category); }
    if (minPrice != null) { where.push('price >= ?'); params.push(minPrice); }
    if (maxPrice != null) { where.push('price <= ?'); params.push(maxPrice); }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const data = db.prepare(`SELECT * FROM products ${whereSql} ORDER BY createdAt DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);
    const countRow = db.prepare(`SELECT COUNT(*) as cnt FROM products ${whereSql}`).get(...params);
    return { data, total: countRow.cnt };
  },
  getById(id) {
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  },
  decrementStock(productId, qty) {
    const product = this.getById(productId);
    if (!product || product.stock < qty) return false;
    db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(qty, productId);
    return true;
  },
  allCategories() {
    return db.prepare('SELECT DISTINCT category FROM products ORDER BY category ASC').all().map(r => r.category);
  }
};
