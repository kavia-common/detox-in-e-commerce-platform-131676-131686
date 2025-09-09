import jwt from 'jsonwebtoken';

const { JWT_SECRET = 'change_me', JWT_EXPIRES_IN = '7d' } = process.env;

// PUBLIC_INTERFACE
export function signJwt(payload) {
  /** Sign and return a JWT for a given payload. */
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// PUBLIC_INTERFACE
export function verifyJwt(token) {
  /** Verify a JWT and return the payload. Throws on invalid. */
  return jwt.verify(token, JWT_SECRET);
}
