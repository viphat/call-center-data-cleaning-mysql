const express = require('express')
const router = express.Router()

const { importDataController } = require('../controllers/importDataController')
const { deleteDataController } = require('../controllers/deleteDataController')
const { exportDataController } = require('../controllers/exportDataController')
const { checkDataController } = require('../controllers/checkDataController')
const {
  importMatchesController
} = require('../controllers/importMatchesController')

const longRunningTimeout = (req, res, next) => {
  // Set timeout for long running requests
  // 10 minutes
  res.setTimeout(10 * 60 * 1000, () => {
    console.log('Request has timed out.')
    return res.status(408).send('Request has timed out.')
  })

  next()
}

router.post('/import', longRunningTimeout, importDataController.importData)
router.post('/export_data', longRunningTimeout, exportDataController.exportData)
router.post('/check_data', longRunningTimeout, checkDataController.checkData)
router.post(
  '/import_matches',
  longRunningTimeout,
  importMatchesController.importData
)
router.post('/delete_data_by_batch', deleteDataController.deleteData)

module.exports = router
