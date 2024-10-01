const express = require('express');
const multer = require('multer');

const router = express.Router();
const { generateNews, getNews } = require('../controller/MockupController.js');

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads'); // Ensure this path is correct
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Append a timestamp to the filename
  },
});


const upload = multer({ storage: storage });

router.post('/', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    console.log('Uploaded File:', req.file); // Ensure the file path is correct
    next();
  });
}, generateNews);



// Route to get all news mockups
router.get('/', getNews);

module.exports = router;
