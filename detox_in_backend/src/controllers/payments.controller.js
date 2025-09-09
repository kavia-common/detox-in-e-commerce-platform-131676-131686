import { processPayment } from '../services/payments.service.js';

// PUBLIC_INTERFACE
export function postPaymentIntent(req, res, next) {
  /** Create a mock payment intent. Body: {amount, currency, method} */
  try {
    const { amount, currency = 'USD', method = 'mock', metadata } = req.body || {};
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const data = processPayment({ amount, currency, method, metadata });
    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}
