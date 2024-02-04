
const deleteDataController = {
  deleteData: async (req, res) => {
    // get request body batch field value
    const batch = req.body.batch;
    console.log('batch:', batch);
    if (batch) {
      res.send(`Đã xoá dữ liệu batch ${batch} thành công!`);
    } else {
      res.status(400).send('Error: Chưa khai báo batch!');
    }
  },
}

module.exports = deleteDataController;