// This module loads and parses the cinemaTicket_Ref.csv file for use in the backend
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const DATA_PATH = path.join(process.cwd(), 'cinemaTicket_Ref.csv');

export function loadCinemaData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(DATA_PATH)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}
