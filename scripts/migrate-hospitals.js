#!/usr/bin/env node
console.log('Running Data Migration for Customers Table (From Sqlite3 to MySQL)...');

const Hospital = require('../models').Hospital;

// Load the source database by sqlite3
const sqlite3 = require('sqlite3').verbose();
const sourceFilePath = "./input/db.sqlite3";
const sourceDb = new sqlite3.Database(sourceFilePath);

async function importHospital(row) {
  // Insert the hospital into MySQL database

  // Check if the hospital already exists
  const hospital = await Hospital.findOne({
    where: {
      hospital_id: row.hospital_id
    }
  });

  if (hospital) {
    return;
  }

  await Hospital.create({
    hospital_id: row.hospital_id,
    name: row.name,
    province_id: row.province_id,
  })
}

function importHospitals() {
  return new Promise((resolve, reject) => {
    sourceDb.all(
      `SELECT * FROM hospitals ORDER BY hospital_id`,
      async (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }

        for (const row of rows) {
          await importHospital(row);
        }

        resolve();
      }
    );
  })
}

importHospitals().then(() => {
  console.log("Hospitals imported");
  process.exit();
});