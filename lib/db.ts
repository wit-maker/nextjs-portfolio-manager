import { PrismaClient } from '@prisma/client';

declare global {
  var db: PrismaClient | undefined;
}

const globalForPrisma = global as unknown as { db: PrismaClient | undefined };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.db = db;
}

export default db;