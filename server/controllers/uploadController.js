const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No media file detected in payload' });
    }

    // Convert the memory buffer from Multer into a readable stream for Cloudinary
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'nexusfund_assets' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Media upload failed: ' + err.message });
  }
};