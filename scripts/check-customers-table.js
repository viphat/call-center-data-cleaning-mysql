#!/usr/bin/env node

console.log("Checking Data Migration Status...");

const Customer = require('../models').Customer;

async function main() {
  const count = await Customer.count();
  console.log(`Number of customers migrated: ${count}`);

  // Last customer migrated
  const lastCustomer = await Customer.findOne({
    order: [
      ['customer_id', 'DESC']
    ]
  });

  console.log(`Last customer migrated: ${lastCustomer.customer_id}`);

  // break the process
  process.exit();
}

main();