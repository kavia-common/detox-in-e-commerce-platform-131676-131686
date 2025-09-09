import { randomUUID } from 'node:crypto';

// PUBLIC_INTERFACE
export function processPayment({ amount, currency, method, metadata }) {
  /** Mock payment processing. Always succeeds and returns a reference. */
  if (method !== 'mock') {
    const err = new Error('Unsupported payment method');
    err.status = 400;
    throw err;
  }
  const ref = `pay_${randomUUID()}`;
  return { status: 'succeeded', provider: 'mock', amount, currency, reference: ref, metadata: metadata || {} };
}
