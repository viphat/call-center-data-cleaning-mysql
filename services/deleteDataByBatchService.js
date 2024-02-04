const Customer = require('../models/customers');

const deleteDataByBatchService = {
  deleteCustomersByBatch: async (batch) => {
    try {
      const result = await Customer.destroy({
        where: {
          batch: batch
        }
      });
      return result;
    } catch (error) {
      console.log('Error:', error);
      return error;
    }
  }
}

module.exports = deleteDataByBatchService;
