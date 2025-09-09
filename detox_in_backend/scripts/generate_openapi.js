import { writeFileSync, mkdirSync } from 'node:fs';
import { openApiDoc } from '../src/openapi.js';

mkdirSync('interfaces', { recursive: true });
writeFileSync('interfaces/openapi.json', JSON.stringify(openApiDoc, null, 2));
console.log('OpenAPI written to interfaces/openapi.json');
