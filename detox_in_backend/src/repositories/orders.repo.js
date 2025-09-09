import db from '../db/database.js';

export const OrdersRepo = {
  createOrder(userId, items, total, currency, paymentRef) {
    const createdAt = new Date().toISOString();
    const status = 'paid';
    const orderStmt = db.prepare('INSERT INTO orders (userId, status, total, currency, paymentRef, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
    const info = orderStmt.run(userId, status, total, currency, paymentRef, createdAt);
    const orderId = info.lastInsertRowid;

    const itemStmt = db.prepare('INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)');
    for (const it of items) {
      itemStmt.run(orderId, it.productId, it.quantity, it.price);
    }
    return this.getById(orderId);
  },
  getById(id) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) return null;
    const items = db.prepare(`
      SELECT oi.productId, p.name, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON p.id = oi.productId
      WHERE oi.orderId = ?`).all(id);
    return { ...order, items };
  },
  listByUser(userId) {
    const orders = db.prepare('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC').all(userId);
    return orders.map(o => ({ ...o, items: db.prepare('SELECT productId, quantity, price FROM order_items WHERE orderId = ?').all(o.id) }));
  }
};
