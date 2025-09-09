import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// PUBLIC_INTERFACE
export async function hashPassword(password) {
  /** Hash a plaintext password with bcrypt. */
  return bcrypt.hash(password, SALT_ROUNDS);
}

// PUBLIC_INTERFACE
export async function verifyPassword(password, hash) {
  /** Verify a plaintext password against a hash. */
  return bcrypt.compare(password, hash);
}
