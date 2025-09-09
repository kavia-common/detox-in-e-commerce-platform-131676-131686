import { CartsRepo } from '../repositories/carts.repo.js';
import { ProductsRepo } from '../repositories/products.repo.js';

// PUBLIC_INTERFACE
export function getCart(userId) {
  /** Get cart and items for user. */
  const cart = CartsRepo.getOrCreateCart(userId);
  const items = CartsRepo.getCartItems(cart.id);
  const totals = calcTotals(items);
  return { cartId: cart.id, items, ...totals };
}

// PUBLIC_INTERFACE
export function addToCart(userId, productId, quantity) {
  /** Add item to user's cart. */
  const product = ProductsRepo.getById(productId);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  const cart = CartsRepo.getOrCreateCart(userId);
  CartsRepo.addItem(cart.id, productId, quantity);
  return getCart(userId);
}

// PUBLIC_INTERFACE
export function updateCartItem(userId, productId, quantity) {
  /** Update quantity of a cart item. */
  const product = ProductsRepo.getById(productId);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  const cart = CartsRepo.getOrCreateCart(userId);
  CartsRepo.updateItem(cart.id, productId, quantity);
  return getCart(userId);
}

// PUBLIC_INTERFACE
export function removeFromCart(userId, productId) {
  /** Remove item from cart. */
  const cart = CartsRepo.getOrCreateCart(userId);
  CartsRepo.removeItem(cart.id, productId);
  return getCart(userId);
}

function calcTotals(items) {
  let subtotal = 0;
  let currency = 'USD';
  for (const it of items) {
    subtotal += it.price * it.quantity;
    currency = it.currency || currency;
  }
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { subtotal, tax, shipping, total, currency };
}
