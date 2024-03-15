/** 
 * File Name: seed.js
 * Purpose: Seed data from jet_facts.csv into Vercel Postgresql db.
 * Created Date: 2024-03-14 
 */ 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const { parse } = require('csv-parse/sync');

async function main() {
  const fileContent = fs.readFileSync('./app/lib/jet_facts.csv', 'utf8');
  const records = parse(fileContent, { columns: true, skip_empty_lines: true });
  for (const record of records) {
    await prisma.jet.create({
      data: {
        name: record.name,
        wingspan: parseFloat(record.wingspan),
        engines: parseInt(record.engines, 10),
        year: parseInt(record.year, 10),
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
