/** 
 * File Name: prisma.ts
 * Purpose: Initializes and exports a instance of PrismaClient for interacting with the database. 
 * Created Date: 2024-03-14 
 */

import { PrismaClient } from '@prisma/client';

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

const prisma: PrismaClient = global.prisma;

export default prisma;
