const Customer = require('../models').Customer

const deleteDataByBatchService = {
  deleteCustomersByBatch: async (batch, source) => {
    try {
      const result = await Customer.destroy({
        where: {
          batch: batch,
          source: source
        }
      })
      return result
    } catch (error) {
      console.log('Error:', error)
      return error
    }
  }
}

module.exports = deleteDataByBatchService
