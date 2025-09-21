import { readFileSync } from 'fs';
import { join } from 'path';

function main() {
  const raw = readFileSync(join(__dirname, 'seed-data.json'), 'utf-8');
  const data = JSON.parse(raw);
  console.log('Seed data loaded:', Object.keys(data));
  console.log('Implement Prisma-based seeding in later iterations.');
}

main();
