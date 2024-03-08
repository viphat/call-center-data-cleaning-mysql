#!/usr/bin/env node

console.log('Checking Data Migration Status...')

const Customer = require('../models').Customer

async function main() {
  const count = await Customer.count()
  console.log(`Number of customers migrated: ${count}`)

  // // Last customer migrated
  // const lastCustomer = await Customer.findOne({
  //   order: [['customer_id', 'DESC']]
  // })

  // console.log(`Last customer migrated: ${lastCustomer.customer_id}`)

  const customers = await Customer.findAll({
    where: {
      duplicatedWithAnotherAgency: 1,
      batch: 'W244'
    }
  })

  console.log(
    `Number of customers with duplicatedWithAnotherAgency: ${customers.length}`
  )

  // print all customers with duplicatedWithAnotherAgency
  customers.forEach((customer) => {
    console.log(customer.customer_id)
    console.log(customer.phone)
  })

  // break the process
  process.exit()
}

main()
