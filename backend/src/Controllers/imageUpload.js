const cloudinary = require('../Controllers/cloudinary')


exports.uploadImage = async function (req, res) {
    try {
        
        let image = req.files
        if (image == undefined || image.length == 0) return res.status(400).send({ status: false, message: "Please provide a product image" })

        if (image.length == 1) {

            if (image[0].mimetype.split('/')[0] != 'image') {
                return res.status(400).send({ status: false, message: "Provide a jpeg or png file 📷" })
            }
            let imageLink = await cloudinary.uploadFile(image[0])
            return res.status(201).send({ status: true, message: "Success", data: imageLink });
        }
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
