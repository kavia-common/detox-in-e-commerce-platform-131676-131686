import { initializeSchema } from '../src/db/database.js';

// Simply ensuring schema exists
initializeSchema();
console.log('Database migrated');
