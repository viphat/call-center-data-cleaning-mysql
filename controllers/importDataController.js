const multer = require('multer');

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
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    console.log('File accepted')
    return cb(null, true);
  } else {
    cb('Error: Only .xlsx files are allowed!');
  }
}

const importDataController = {
  importData: async (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (req.file == undefined) {
          res.status(400).send('Error: No File Selected!');
        } else {
          res.send('File Uploaded!');
        }
      }
    });
  },
}

module.exports = importDataController;
