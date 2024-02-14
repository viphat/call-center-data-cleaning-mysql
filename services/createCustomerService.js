const Customer = require('../models').Customer
const { Op } = require('sequelize')

const createCustomerService = {
  createCustomer: async (customer) => {
    customer.phone = '' + customer.phone.replace(/[\.\-\_\s\+\(\)]/g, '')
    customer.isPhoneDuplicated = false

    if (
      customer.s1 !== undefined &&
      customer.s1 !== null &&
      customer.s1 !== ''
    ) {
      if (customer.sampling == 'S2') {
        customer.illogicalSampling = 1
        customer.sampling = 'S2'
        customer.s1 = ''
        customer.s2 = 'S1'
      }
    }

    if (
      customer.s2 !== undefined &&
      customer.s2 !== null &&
      customer.s2 !== ''
    ) {
      if (customer.sampling == 'S1') {
        customer.illogicalSampling = 1
        customer.sampling = 'S1'
        customer.s2 = ''
        customer.s1 = 'S2'
      }
    }

    const res = await Customer.create(customer)
    customer.customer_id = res.customer_id

    customer = await createCustomerService.isPhoneDuplicated(customer)
    customer =
      await createCustomerService.isPhoneDuplicateWithAnotherAgency(customer)

    return customer
  },

  isPhoneDuplicateWithAnotherAgency: async (customer) => {
    if (
      customer.phone === undefined ||
      customer.phone === null ||
      customer.phone === ''
    ) {
      return customer
    }

    if (
      customer.phone.length < 8 ||
      customer.phone.length > 12 ||
      isNaN(parseInt(customer.phone))
    ) {
      // Không check với trường hợp phone không hợp lệ
      return customer
    }

    const res = await Customer.findOne({
      where: {
        phone: customer.phone,
        source: {
          [Op.ne]: customer.source
        },
        customer_id: {
          [Op.ne]: customer.customer_id
        }
      }
    })

    if (res === null) {
      return customer
    }

    customer.duplicateWithAnotherAgency = res
    customer.duplicatedWithAnotherAgency = 1
    customer.isPhoneDuplicatedWithAnotherAgency = true

    return customer
  },

  isPhoneDuplicated: async (customer) => {
    if (
      customer.phone === undefined ||
      customer.phone === null ||
      customer.phone === ''
    ) {
      return customer
    }

    if (
      customer.phone.length < 8 ||
      customer.phone.length > 12 ||
      isNaN(parseInt(customer.phone))
    ) {
      // Không check với trường hợp phone không hợp lệ
      return customer
    }

    const res = await Customer.findOne({
      where: {
        phone: customer.phone,
        source: customer.source,
        customer_id: {
          [Op.ne]: customer.customer_id
        }
      }
    })

    if (res === null) {
      return customer
    }

    customer.isPhoneDuplicated = true
    customer.duplicatedWith = res
    customer.duplicatedPhone = 1

    if (res.collectedYear) {
      var duplicatedRecordCollectedDate = new Date(
        res.collectedYear,
        res.collectedMonth - 1,
        res.collectedDay
      )
      var currentCollectedDate = new Date(
        customer.collectedYear,
        customer.collectedMonth - 1,
        customer.collectedDay
      )

      var year = 2
      if (customer.source === 'IMC') {
        year = 1
      }

      if (
        currentCollectedDate.getTime() <
        duplicatedRecordCollectedDate.getTime() +
          year * 365 * 24 * 60 * 60 * 1000
      ) {
        customer.duplicatedWithinPast2Years = 1
        customer.duplicatedOverPast2Years = 0
      } else {
        if (
          customer.collectedYear == res.collectedYear + year &&
          customer.collectedMonth == res.collectedMonth &&
          customer.collectedDay == res.collectedDay
        ) {
          customer.duplicatedWithinPast2Years = 1
          customer.duplicatedOverPast2Years = 0
        } else {
          customer.duplicatedOverPast2Years = 1
          customer.duplicatedWithinPast2Years = 0
        }
      }
    }

    if (customer.sampling !== 'S1' && customer.sampling !== 'S2') {
      return customer
    }

    const subRes = await Customer.findOne({
      where: {
        phone: customer.phone,
        sampling: customer.sampling,
        customer_id: {
          [Op.ne]: customer.customer_id
        }
      }
    })

    if (subRes === null) {
      customer.duplicatedPhoneBetweenS1AndS2 = 1
      return customer
    }

    if (customer.sampling === 'S1') {
      customer.duplicatedPhoneS1 = 1
    } else {
      customer.duplicatedPhoneS2 = 1
    }

    return customer
  }
}

module.exports = createCustomerService
