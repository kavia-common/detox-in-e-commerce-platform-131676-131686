# DETOX-IN Backend (Node.js/Express + SQLite)

A secure, modular REST API for DETOX-IN e-commerce (bottles and juice cans), built with Express and SQLite (better-sqlite3). Includes auth (JWT), product search, cart, orders, and mock payments. Clean architecture: routes -> controllers -> services -> repositories -> db.

## Quick start

1) Copy env
```
cp .env.example .env
```
Edit `.env` and set strong JWT_SECRET.

2) Install dependencies
```
npm install
```

3) Initialize DB and seed products
```
npm run migrate
npm run seed
```

4) Run the server
```
npm start
```
Server: http://localhost:4000
API Docs: http://localhost:4000/api/docs

## API overview

- Auth: POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout
- Products: GET /api/products, GET /api/products/:id, GET /api/products/categories
- Cart (auth): GET /api/cart, POST /api/cart, PATCH /api/cart/:productId, DELETE /api/cart/:productId
- Orders (auth): POST /api/orders, GET /api/orders
- Payments (auth, mock): POST /api/payments/intents

## Project structure

- src/
  - index.js (app entry)
  - openapi.js (Swagger doc)
  - middleware/
  - controllers/
  - services/
  - repositories/
  - utils/
  - db/
  - routes/
- scripts/
  - migrate.js, seed.js, generate_openapi.js
- data/ (SQLite file at DATABASE_PATH)
- interfaces/openapi.json (generated)

## Notes

- Authentication uses stateless JWT (Bearer token).
- Payment is mocked for demo; switch provider by replacing services/payments.service.js.
- Use rate limiting, Helmet, and CORS per env.
