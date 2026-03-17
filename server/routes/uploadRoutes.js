const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware'); // Multer config
const { protect } = require('../middleware/authMiddleware');

// Protect the route so only logged-in users can upload files to Cloudinary
// 'upload.single('image')' intercepts the form-data and parses the file
router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;