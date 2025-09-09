import { createOrderSchema } from '../utils/validators.js';
import { createOrderFromCart, listUserOrders } from '../services/orders.service.js';
import { processPayment } from '../services/payments.service.js';

// PUBLIC_INTERFACE
export function postCreateOrder(req, res, next) {
  /** Create an order from the current user's cart. Body: {paymentMethod, address} */
  try {
    const { value, error } = createOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // Mock payment first (amount will be derived after fetching cart in service - so here we simulate)
    // We pass 0 and the service will compute final order total; we only need a payment reference.
    const payment = processPayment({ amount: 0, currency: 'USD', method: value.paymentMethod, metadata: { userId: req.user.id } });

    const order = createOrderFromCart(req.user.id, { address: value.address, paymentRef: payment.reference });
    return res.status(201).json({ order, payment });
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export function getMyOrders(req, res, next) {
  /** Get current user's order history. */
  try {
    const orders = listUserOrders(req.user.id);
    return res.json({ orders });
  } catch (e) {
    return next(e);
  }
}
