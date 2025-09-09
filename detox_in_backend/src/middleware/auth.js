import { verifyJwt } from '../utils/jwt.js';

// PUBLIC_INTERFACE
export function requireAuth(req, res, next) {
  /** Express middleware to require a valid Bearer JWT and attach user info to req.user. */
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyJwt(token);
    req.user = { id: payload.sub, email: payload.email, name: payload.name };
    return next();
  } catch (_e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
