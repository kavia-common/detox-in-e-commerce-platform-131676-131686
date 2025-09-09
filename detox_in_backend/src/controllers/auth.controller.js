import { registerSchema, loginSchema } from '../utils/validators.js';
import { registerUser, loginUser } from '../services/auth.service.js';

// PUBLIC_INTERFACE
export async function postRegister(req, res, next) {
  /** Register a user and return JWT. Body: {email,name,password} */
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const result = await registerUser(value);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export async function postLogin(req, res, next) {
  /** Login with email/password and return JWT. */
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const result = await loginUser(value);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
export async function postLogout(_req, res) {
  /** Logout (stateless JWT): client should discard token. */
  return res.json({ message: 'Logged out' });
}
