#!/usr/bin/env node
console.log('Running Data Migration for Customers Table (From Sqlite3 to MySQL)...');

const Match = require('../models').Match;

// Load the source database by sqlite3
const sqlite3 = require('sqlite3').verbose();
const sourceFilePath = "./input/db.sqlite3";
const sourceDb = new sqlite3.Database(sourceFilePath);

async function importMatch(row) {
  // Check if the record already exists
  const match = await Match.findOne({
    where: {
      match_id: row.match_id
    }
  });

  if (match) {
    return;
  }

  await Match.create({
    match_id: row.match_id,
    hospital_id: row.hospital_id,
    name: row.name,
  })
}

function importMatches() {
  return new Promise((resolve, reject) => {
    sourceDb.all(
      `SELECT * FROM matches ORDER BY match_id`,
      async (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }

        for (const row of rows) {
          await importMatch(row);
        }

        resolve();
      }
    );
  })
}

importMatches().then(() => {
  console.log("Matches imported");
  process.exit();
});