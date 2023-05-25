const express = require('express');
const router = express.Router()
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')
const cartController = require('../Controllers/cartController')
const paymentController = require('../Controllers/paymentController')
const auth = require('../Middlewares/authware')
const handleImageUpload = require('../Controllers/imageUpload')

const { createUser, loginUser } = userController
const { createProduct, getProductById, getProducts } = productController
const { addToCart, updateCart, fetchCart, deleteCart } = cartController
const { authentication, authorization } = auth


router.post('/register', createUser)
router.post('/login', loginUser)


router.post('/createProduct', createProduct)
router.get('/getProducts', getProducts)
router.get('/getProduct/:productId', getProductById)

router.post('/users/:userId/cart', authentication, authorization, addToCart)
router.put('/users/:userId/cart', authentication, authorization, updateCart)
router.get('/users/:userId/cart', authentication, authorization, fetchCart)
router.delete('/users/:userId/cart', authentication, authorization, deleteCart)


router.post('/create-checkout-session', paymentController.payment)

router.post('/upload', handleImageUpload.uploadImage )

module.exports = router