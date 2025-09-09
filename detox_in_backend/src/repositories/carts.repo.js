import db from '../db/database.js';

export const CartsRepo = {
  getOrCreateCart(userId) {
    let cart = db.prepare('SELECT * FROM carts WHERE userId = ?').get(userId);
    if (!cart) {
      const createdAt = new Date().toISOString();
      const info = db.prepare('INSERT INTO carts (userId, createdAt) VALUES (?, ?)').run(userId, createdAt);
      cart = db.prepare('SELECT * FROM carts WHERE id = ?').get(info.lastInsertRowid);
    }
    return cart;
  },
  getCartItems(cartId) {
    const items = db.prepare(`
      SELECT ci.id, ci.productId, p.name, p.price, p.currency, p.imageUrl, ci.quantity
      FROM cart_items ci
      JOIN products p ON p.id = ci.productId
      WHERE ci.cartId = ?`).all(cartId);
    return items;
  },
  addItem(cartId, productId, quantity) {
    const existing = db.prepare('SELECT * FROM cart_items WHERE cartId = ? AND productId = ?').get(cartId, productId);
    if (existing) {
      db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existing.id);
    } else {
      db.prepare('INSERT INTO cart_items (cartId, productId, quantity) VALUES (?, ?, ?)').run(cartId, productId, quantity);
    }
  },
  updateItem(cartId, productId, quantity) {
    db.prepare('UPDATE cart_items SET quantity = ? WHERE cartId = ? AND productId = ?').run(quantity, cartId, productId);
  },
  removeItem(cartId, productId) {
    db.prepare('DELETE FROM cart_items WHERE cartId = ? AND productId = ?').run(cartId, productId);
  },
  clearCart(cartId) {
    db.prepare('DELETE FROM cart_items WHERE cartId = ?').run(cartId);
  }
};
