const {
  deleteCustomersByBatch
} = require('../services/deleteDataByBatchService')

const deleteDataController = {
  deleteData: async (req, res) => {
    // get request body batch field value
    const batch = req.body.batch
    const source = req.body.source
    console.log('Batch:', batch)
    console.log('Source:', source)

    if (batch == undefined || batch == null || batch == '') {
      return res.status(400).send('Error: Chưa khai báo batch!')
    }

    if (source == undefined || source == null || source == '') {
      return res.status(400).send('Error: Chưa khai báo source!')
    }

    await deleteCustomersByBatch(batch, source)

    return res.status(200).send('Xóa dữ liệu thành công!')
  }
}

module.exports = { deleteDataController }
