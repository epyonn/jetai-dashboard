/** 
 * File Name: parse.js
 * Purpose: Check output data from jet_facts.csv after being parsed by csv-parser.
 * Created Date: 2024-03-12 
 */ 

const csvParser = require('csv-parser');
const fs = require('fs');

const csvFilePath = './jet_facts.csv'; 
fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    console.log(row); 
  })
  .on('end', () => {
    console.log('CSV file successfully processed and parsed.');
  });
