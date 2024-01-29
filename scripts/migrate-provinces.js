#!/usr/bin/env node
console.log('Running Data Migration for Customers Table (From Sqlite3 to MySQL)...');

const sourceFilePath = "./input/sqlite3/db.sqlite3";

const Province = require('../models').Province;

// Load the source database by sqlite3
const sqlite3 = require('sqlite3').verbose();
const sourceDb = new sqlite3.Database(sourceFilePath);

async function importProvince(row) {
  // Insert the province into MySQL database
  // Only if it doesn't exist
  const province = await Province.findOne({
    where: {
      province_id: row.province_id
    }
  });

  if (province) {
    return;
  }

  await Province.create({
    province_id: row.province_id,
    name: row.name,
    area_id: row.area_id,
  })
}

function importProvinces() {
  return new Promise((resolve, reject) => {
    sourceDb.all(
      `SELECT * FROM provinces ORDER BY province_id`,
      async (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }

        for (const row of rows) {
          await importProvince(row);
        }

        resolve();
      }
    );
  })
}

importProvinces().then(() => {
  console.log("Provinces imported");
  process.exit();
});