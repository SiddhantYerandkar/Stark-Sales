const aws = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1"
})

exports.uploadFile = async (file) => {

    return new Promise((resolve, reject) => {

        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        let uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "ecommerceImage/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {

            if (err) return reject({ "error": err })

            return resolve(data.Location)
        })
    })
}