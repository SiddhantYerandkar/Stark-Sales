const productModel = require('../Models/productModel')
const aws = require('../Controllers/aws')
const validation = require('../Middlewares/validation')
const { isValidString, isValidPrice } = validation

exports.createProduct = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide the product details" })
        }

        let { title, description, price } = data

        if (!title || !isValidString(title)) return res.status(400).send({ status: false, message: "Product title is required" })

        let duplicateTitle = await productModel.findOne({ title: title })
        if (duplicateTitle) return res.status(400).send({ status: false, message: "This title already in use, try another" })

        if (!description || !isValidString(description)) return res.status(400).send({ status: false, message: "Please provide product description" })

        if (!price || !isValidPrice(price)) return res.status(400).send({ status: false, message: "Mention product price" })

        let image = req.files
        if (image == undefined || image.length == 0) return res.status(400).send({ status: false, message: "Please provide a product image" })

        if (image.length == 1) {

            if (image[0].mimetype.split('/')[0] != 'image') {
                return res.status(400).send({ status: false, message: "Provide a jpeg or png file 📷" })
            }
            let imageLink = await aws.uploadFile(image[0])
            data.productImage = imageLink
        }
        const createProduct = await productModel.create(data)
        return res.status(201).send({ status: true, message: "Success", data: createProduct });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


exports.getProducts = async function (req, res) {
    try {

        let product = await productModel.find()

        return res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.productId

        let product = await productModel.findOne({ _id: id })
        
        if (!product) return res.status(404).send({ status: false, message: "Product not found 😕" })

        return res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}