import db from '../src/db/database.js';
import { initializeSchema } from '../src/db/database.js';

initializeSchema();

const now = new Date().toISOString();
const products = [
  {
    sku: 'BOTTLE-GLASS-500',
    name: 'DETOX-IN Glass Bottle 500ml',
    description: 'Reusable glass bottle with bamboo cap. Eco-friendly and stylish.',
    price: 14.99,
    currency: 'USD',
    category: 'Bottles',
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-c1e1a6c1f06b',
    stock: 120,
    createdAt: now
  },
  {
    sku: 'BOTTLE-STEEL-750',
    name: 'DETOX-IN Steel Bottle 750ml',
    description: 'Insulated stainless steel bottle keeps drinks cold for 24h.',
    price: 24.99,
    currency: 'USD',
    category: 'Bottles',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
    stock: 80,
    createdAt: now
  },
  {
    sku: 'JUICE-ORANGE-330',
    name: 'DETOX-IN Orange Juice 330ml',
    description: 'Freshly pressed orange juice, no added sugar.',
    price: 3.49,
    currency: 'USD',
    category: 'Juice Cans',
    imageUrl: 'https://images.unsplash.com/photo-1542444459-db63c2ad2b0b',
    stock: 300,
    createdAt: now
  },
  {
    sku: 'JUICE-GREEN-330',
    name: 'DETOX-IN Green Detox 330ml',
    description: 'Spinach, kale, apple and ginger for a refreshing detox.',
    price: 3.99,
    currency: 'USD',
    category: 'Juice Cans',
    imageUrl: 'https://images.unsplash.com/photo-1524594224032-31f0fcf03949',
    stock: 250,
    createdAt: now
  }
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO products (sku, name, description, price, currency, category, imageUrl, stock, createdAt)
  VALUES (@sku, @name, @description, @price, @currency, @category, @imageUrl, @stock, @createdAt)
`);

for (const p of products) {
  insert.run(p);
}

console.log('Seeded products');
