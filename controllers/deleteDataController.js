const { deleteCustomersByBatch } = require('../services/deleteDataByBatchService');

const deleteDataController = {
  deleteData: async (req, res) => {
    // get request body batch field value
    const batch = req.body.batch;
    console.log('batch:', batch);
    if (batch) {
      const result = await deleteCustomersByBatch(batch);
      res.send(result);
    } else {
      res.status(400).send('Error: Chưa khai báo batch!');
    }
  },
}

module.exports = deleteDataController;