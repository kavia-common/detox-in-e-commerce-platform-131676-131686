export const openApiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'DETOX-IN E-commerce API',
    version: '1.0.0',
    description: 'REST API for DETOX-IN bottles and juice cans store'
  },
  servers: [{ url: '/api' }],
  tags: [
    { name: 'auth', description: 'User authentication' },
    { name: 'products', description: 'Product browsing and search' },
    { name: 'cart', description: 'Shopping cart' },
    { name: 'orders', description: 'Order placement and history' },
    { name: 'payments', description: 'Payment processing' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          sku: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          currency: { type: 'string' },
          category: { type: 'string' },
          imageUrl: { type: 'string' },
          stock: { type: 'integer' },
          createdAt: { type: 'string' }
        }
      },
      CartItem: {
        type: 'object',
        properties: {
          productId: { type: 'integer' },
          quantity: { type: 'integer' }
        },
        required: ['productId', 'quantity']
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          status: { type: 'string' },
          total: { type: 'number' },
          currency: { type: 'string' },
          createdAt: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/health': {
      get: {
        tags: ['auth'],
        summary: 'Health check',
        responses: { 200: { description: 'ok' } }
      }
    }
  }
};
