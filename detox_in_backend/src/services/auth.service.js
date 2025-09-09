import { UsersRepo } from '../repositories/users.repo.js';
import { hashPassword, verifyPassword } from '../utils/crypto.js';
import { signJwt } from '../utils/jwt.js';

// PUBLIC_INTERFACE
export async function registerUser({ email, name, password }) {
  /** Create a new user, returning token and profile. */
  const existing = UsersRepo.findByEmail(email);
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }
  const passwordHash = await hashPassword(password);
  const user = UsersRepo.create({ email, passwordHash, name });
  const token = signJwt({ sub: user.id, email: user.email, name: user.name });
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

// PUBLIC_INTERFACE
export async function loginUser({ email, password }) {
  /** Validate credentials and return token and profile. */
  const user = UsersRepo.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const token = signJwt({ sub: user.id, email: user.email, name: user.name });
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}
