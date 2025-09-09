import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { openApiDoc } from './openapi.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/orders.routes.js';
import paymentRoutes from './routes/payments.routes.js';

import { notFoundHandler, errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();

// Security and middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || corsOrigins.length === 0 || corsOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error('CORS not allowed'), false);
  },
  credentials: true
}));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'detox-in-backend', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// API docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`DETOX-IN backend running on http://localhost:${PORT}`);
});
