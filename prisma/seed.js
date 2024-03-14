/** 
 * File Name: seed.js
 * Purpose: Seed data from jet_facts.csv into Vercel Postgresql db.
 * Created Date: 2024-03-12 
 */ 

// Import packages for parsing CSV files and Prisma Client for DB interaction
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
// Ensure the correct import for the sync parse method from csv-parse
const { parse } = require('csv-parse/sync');

async function main() {
  // Load and parse the CSV file
  const fileContent = fs.readFileSync('./app/lib/jet_facts.csv', 'utf8');
  const records = parse(fileContent, { columns: true, skip_empty_lines: true });

  // Iterate over the records and create a new entry in the database for each
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

// Execute the main function and handle possible errors
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure the Prisma Client connection is closed after the script is done
    await prisma.$disconnect();
  });
