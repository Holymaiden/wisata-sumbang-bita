#!/usr/bin/env node

import { exec } from 'child_process';
import { join } from 'path';

console.log('🌱 Running Prisma seed...');

process.env.NODE_ENV = 'development';

const seedPath = join(__dirname, 'seed.ts');
const command = `npx tsx ${seedPath}`;

exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }

  if (stderr) {
    console.warn('⚠️ Warnings:', stderr);
  }

  console.log(stdout);
  console.log('✅ Seed completed successfully!');
  process.exit(0);
});
