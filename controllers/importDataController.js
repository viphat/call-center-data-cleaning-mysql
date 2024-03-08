const multer = require('multer')
const path = require('path')

const { importData } = require('../services/importDataService')

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('inputFile')

// checkFileType function (only accept .xlsx)
function checkFileType(file, cb) {
  const filetypes = /xlsx/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype =
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  if (extname && mimetype) {
    console.log('File accepted')
    return cb(null, true)
  }

  return cb('Error: Only .xlsx files are allowed!')
}

const importDataController = {
  importData: (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err)
      }

      const batch = req.body.batch
      const source = req.body.source

      if (batch == undefined || batch == null || batch == '') {
        return res.status(400).send('Error: Batch is undefined!')
      }

      if (source == undefined || source == null || source == '') {
        return res.status(400).send('Error: Source is undefined!')
      }

      if (req.file == undefined) {
        return res.status(400).send('Error: No File Selected!')
      }

      const outputPath = await importData(req.file, source, batch)
      console.log('outputPath', outputPath)

      // send file to browser (download)
      res.set(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      const filename = outputPath.split('/').pop()

      res.download(outputPath, filename, (err) => {
        if (err) {
          return res
            .status(500)
            .send('Error: Could not download the file. ' + err)
        }
      })
    })
  }
}

module.exports = { importDataController, storage, checkFileType, upload }
