#!/usr/bin/env node
console.log('Running Data Migration for Customers Table (From Sqlite3 to MySQL)...');

const sourceFilePath = "./input/sqlite3/db.sqlite3";
const args = process.argv.slice(2);
const startingCustomerId = args[0] || 1;

const Customer = require('../models').Customer;

// Load the source database by sqlite3
const sqlite3 = require('sqlite3').verbose();
const sourceDb = new sqlite3.Database(sourceFilePath);

async function insertCustomer(row) {
  // Insert the customer into MySQL database
  // Only if it doesn't exist

  // Check if the customer already exists
  const customer = await Customer.findOne({
    where: {
      customer_id: row.customer_id
    }
  });

  if (customer) {
    return;
  }

  await Customer.create({
    customer_id: row.customer_id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    district: row.district,
    province: row.province,
    phone: row.phone,
    day: row.day,
    month: row.month,
    year: row.year,
    s1: row.s1,
    s2: row.s2,
    sampling: row.sampling,
    hospital_id: row.hospital_id,
    batch: row.batch,
    source: row.source,
    hasError: row.hasError,
    missingData: row.missingData,
    missingFirstName: row.missingFirstName,
    missingLastName: row.missingLastName,
    missingMomName: row.missingMomName,
    missingDistrict: row.missingDistrict,
    missingProvince: row.missingProvince,
    missingAddress: row.missingAddress,
    missingPhone: row.missingPhone,
    missingEmail: row.missingEmail,
    missingSampling: row.missingSampling,
    missingDate: row.missingDate,
    missingMomStatus: row.missingMomStatus,
    illogicalData: row.illogicalData,
    illogicalPhone: row.illogicalPhone,
    illogicalName: row.illogicalName,
    illogicalSampling: row.illogicalSampling,
    illogicalEmail: row.illogicalEmail,
    illogicalAddress: row.illogicalAddress,
    illogicalDate: row.illogicalDate,
    illogicalOther: row.illogicalOther,
    duplicatedPhone: row.duplicatedPhone,
    duplicatedPhoneBetweenS1AndS2: row.duplicatedPhoneBetweenS1AndS2,
    duplicatedPhoneS1: row.duplicatedPhoneS1,
    duplicatedPhoneS2: row.duplicatedPhoneS2,
    duplicatedWithAnotherAgency: row.duplicatedWithAnotherAgency,
    duplicatedWithSameYear: row.duplicatedWithSameYear,
    duplicatedWith2023: row.duplicatedWith2023,
    duplicatedWith2022: row.duplicatedWith2022,
    duplicatedWith2021: row.duplicatedWith2021,
    duplicatedWith2020: row.duplicatedWith2020,
    duplicatedWith2019: row.duplicatedWith2019,
    duplicatedWithinPast2Years: row.duplicatedWithinPast2Years,
    duplicatedOverPast2Years: row.duplicatedOverPast2Years,
    collectedDay: row.collectedDay,
    collectedMonth: row.collectedMonth,
    collectedYear: row.collectedYear,
    staff: row.staff,
    note: row.note,
    pgCode: row.pgCode,
    qrCode: row.qrCode,
  })
}

function main(customerId = 0) {
  sourceDb.all(
    `SELECT * FROM customers WHERE customer_id >= ${customerId} ORDER BY customer_id LIMIT 1000`,
    async (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      if (rows.length === 0) {
        console.log('Migration completed');
        process.exit();
      }

      for (const row of rows) {
        console.log(`Processing customer ${row.customer_id}...`)
        // Insert the customer into MySQL database
        await insertCustomer(row);
      }

      // Get the last customer_id processed
      const lastCustomerId = rows[rows.length - 1].customer_id;

      // Continue to migrate the next batch
      main(lastCustomerId + 1);
    }
  );
}

main(startingCustomerId);