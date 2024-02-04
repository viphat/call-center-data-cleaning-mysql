const express = require('express');
const router = express.Router();
const importDataController = require('../controllers/importDataController');
const deleteDataController = require('../controllers/deleteDataController');

const longRunningTimeout = (req, res, next) => {
  // Set timeout for long running requests
  // 10 minutes
  res.setTimeout(10 * 60 * 1000, () => {
    console.log('Request has timed out.');
    return res.status(408).send('Request has timed out.');
  });

  next();
}

router.post('/import', longRunningTimeout, importDataController.importData);
router.post('/delete_data_by_batch', deleteDataController.deleteData);

module.exports = router;