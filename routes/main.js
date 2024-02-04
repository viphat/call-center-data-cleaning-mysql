const express = require('express');
const router = express.Router();
const importDataController = require('../controllers/importDataController');
const deleteDataController = require('../controllers/deleteDataController');

router.post('/import', importDataController.importData);
router.post('/delete_data_by_batch', deleteDataController.deleteData);

module.exports = router;