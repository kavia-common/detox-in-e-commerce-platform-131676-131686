import db from '../db/database.js';
import { OrdersRepo } from '../repositories/orders.repo.js';
import { CartsRepo } from '../repositories/carts.repo.js';
import { ProductsRepo } from '../repositories/products.repo.js';

// PUBLIC_INTERFACE
export function createOrderFromCart(userId, { address, paymentRef }) {
  /** Create a paid order from user's cart, decrementing stock. */
  const cart = CartsRepo.getOrCreateCart(userId);
  const items = CartsRepo.getCartItems(cart.id);
  if (items.length === 0) {
    const err = new Error('Cart is empty');
    err.status = 400;
    throw err;
  }
  // Calculate totals and verify stock
  let total = 0;
  let currency = 'USD';
  const orderItems = [];
  for (const it of items) {
    const p = ProductsRepo.getById(it.productId);
    if (!p || p.stock < it.quantity) {
      const err = new Error(`Insufficient stock for product ${p ? p.name : it.productId}`);
      err.status = 400;
      throw err;
    }
    total += p.price * it.quantity;
    currency = p.currency || currency;
    orderItems.push({ productId: p.id, quantity: it.quantity, price: p.price });
  }
  const tax = +(total * 0.07).toFixed(2);
  const shipping = total > 50 ? 0 : 4.99;
  total = +(total + tax + shipping).toFixed(2);

  // Transaction
  const trx = db.transaction(() => {
    for (const oi of orderItems) {
      const ok = ProductsRepo.decrementStock(oi.productId, oi.quantity);
      if (!ok) {
        const err = new Error('Stock update failed');
        err.status = 400;
        throw err;
      }
    }
    const order = OrdersRepo.createOrder(userId, orderItems, total, currency, paymentRef);
    CartsRepo.clearCart(cart.id);
    return order;
  });

  return trx();
}

// PUBLIC_INTERFACE
export function listUserOrders(userId) {
  /** List orders for a user. */
  return OrdersRepo.listByUser(userId);
}
