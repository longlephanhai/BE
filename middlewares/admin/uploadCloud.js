const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_KEY,
  api_secret: process.env.CLOUND_SECRET // Click 'View Credentials' below to copy your API secret
});
//end cloudinary
const uploadClound = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
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

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result.secure_url);
      req.body[req.file.fieldname] = result.secure_url
      next()
    }
    upload(req);
  } else {
    next();
  }
}
module.exports = uploadClound