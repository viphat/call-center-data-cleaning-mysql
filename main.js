const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));
app.use(morgan('dev'));

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

app.post('/import', (req, res) => {
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
});

app.post('/delete_data_by_batch', (req, res) => {
  // get request body batch field value
  const batch = req.body.batch;
  console.log('batch:', batch);
  if (batch) {
    res.send(`Đã xoá dữ liệu batch ${batch} thành công!`);
  } else {
    res.status(400).send('Error: Chưa khai báo batch!');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(8080, () => {
  console.log('App listening on port 8080');
});
