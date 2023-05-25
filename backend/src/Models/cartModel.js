const mongoose = require('mongoose')

const ObjId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model(
    'cart',

    new mongoose.Schema({

        userId: {
            type: ObjId,
            ref: 'user',
            required: true,
            unique: true,
            trim: true
        },
        items: [{
            productId: {
                type: ObjId,
                ref: 'product',
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                trim: true
            }
        }],
        totalPrice: {
            type: Number,
            required: true,
            trim: true 
        },
        totalItems: {
            type: Number,
            required: true,
            trim: true 
        }

    }, { timestamps: true })
)

