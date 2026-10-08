import { PrismaClient } from '@prisma/client';
import { seedIfEmpty } from '../src/prisma/seed-data';

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    const created = await seedIfEmpty(prisma);
    console.log(
      created
        ? 'Seed: data created'
        : 'Seed: database already contains data, skipped',
    );
  } finally {
    await prisma.$disconnect();
  }
}

void main();
