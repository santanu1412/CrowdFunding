const multer = require('multer');

/**
 * Multer configuration for handling file uploads.
 * Since we are uploading to Cloudinary, we store the file in server memory 
 * (buffer) rather than writing it to the disk.
 */
const storage = multer.memoryStorage();

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Please upload only image files.'), false);
  }
};

// Initialize upload middleware with constraints
const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024 // Set a hard limit of 5MB per file
  }, 
});

module.exports = upload;