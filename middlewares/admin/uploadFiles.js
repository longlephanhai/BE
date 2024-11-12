const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_KEY,
  api_secret: process.env.CLOUND_SECRET
});

// Upload middleware
const uploadFiles = (req, res, next) => {
  if (req.body.image && req.body.image.length > 0) {
    const images = req.body.image[0];
    let uploadPromises = [];

    for (const key in images) {
      if (images[key]) {
        // console.log('Processing image key:', key, 'Value:', images[key]); // Log kiểm tra giá trị
        if (images[key].startsWith('http')) {
          req.body.image[0][key] = images[key];
          req.body[key] = images[key];
        } else {
          uploadPromises.push(streamUpload(images[key]).then(result => {
            if (result && result.secure_url) { // Kiểm tra chắc chắn result tồn tại
              req.body.image[0][key] = result.secure_url;
              req.body[key] = result.secure_url;
            } else {
              console.error('Missing secure_url for image:', key, result);
            }
          }));
        }
      } else {
        console.error('Image key is missing or invalid:', key);
      }
    }

    Promise.all(uploadPromises)
      .then(() => {
        next();
      })
      .catch((error) => {
        console.error('Upload error:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tải lên.' });
      });
  } else {
    next();
  }
};

// Hàm upload stream
const streamUpload = (dataUrl) => {
  return new Promise((resolve, reject) => {
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadFiles;
