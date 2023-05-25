const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'ecommerceImage',public_id: file.originalname }, (error, result) => {
            if (error) {
                return reject({ error });
            }
            return resolve(result.secure_url);
        }).end(file.buffer);
    });
};
