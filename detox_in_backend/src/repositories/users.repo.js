import db from '../db/database.js';

export const UsersRepo = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },
  findById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  create({ email, passwordHash, name }) {
    const createdAt = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO users (email, passwordHash, name, createdAt) VALUES (?, ?, ?, ?)');
    const info = stmt.run(email, passwordHash, name, createdAt);
    return this.findById(info.lastInsertRowid);
  }
};
