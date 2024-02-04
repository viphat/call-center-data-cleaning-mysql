const multer = require('multer');
const path = require('path');

const { importExcelFile } = require('../services/importExcelFileService');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('inputFile');

// checkFileType function (only accept .xlsx)
function checkFileType(file, cb) {
  const filetypes = /xlsx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  if (extname && mimetype) {
    console.log('File accepted')
    return cb(null, true);
  }

  return cb('Error: Only .xlsx files are allowed!');
}

const importDataController = {
  importData: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }

      const batch = req.body.batch;
      const source = req.body.source;

      if (batch == undefined || source == undefined) {
        return res.status(400).send('Error: Batch or Source is undefined!');
      }

      if (req.file == undefined) {
        return res.status(400).send('Error: No File Selected!');
      }

      await importExcelFile(req.file);
      return res.send('Imported successfully!');
    });
  },
}

module.exports = importDataController;
