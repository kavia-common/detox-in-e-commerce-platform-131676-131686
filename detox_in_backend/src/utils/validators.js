import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(60).required(),
  password: Joi.string().min(6).max(128).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const addCartItemSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).max(100).required()
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).max(100).required()
});

export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string().valid('mock').default('mock'),
  address: Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string().allow('').default(''),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required()
  }).required()
});
