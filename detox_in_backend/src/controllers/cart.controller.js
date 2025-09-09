import { addCartItemSchema, updateCartItemSchema } from '../utils/validators.js';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../services/cart.service.js';

// PUBLIC_INTERFACE
export function getMyCart(req, res, next) {
  /** Get the current user's cart. */
  try {
    const data = getCart(req.user.id);
    return res.json(data);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function postAddToCart(req, res, next) {
  /** Add item to cart. Body: {productId, quantity} */
  try {
    const { value, error } = addCartItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = addToCart(req.user.id, value.productId, value.quantity);
    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function patchCartItem(req, res, next) {
  /** Update a cart item quantity. Body: {quantity} */
  try {
    const productId = Number(req.params.productId);
    const { value, error } = updateCartItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = updateCartItem(req.user.id, productId, value.quantity);
    return res.json(data);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function deleteCartItem(req, res, next) {
  /** Remove an item from cart. */
  try {
    const productId = Number(req.params.productId);
    const data = removeFromCart(req.user.id, productId);
    return res.json(data);
  } catch (e) {
    return next(e);
  }
}
