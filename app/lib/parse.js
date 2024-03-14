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
