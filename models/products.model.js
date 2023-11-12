const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        status: {
            type: Boolean,
        },
        keyFeature: {
            type: Array
        },
        price: {
            type: String,
        },
        rating: {
            type: String,
            required: false,
        },
        spec: {
            type: Array
        },
        brand: {
            type: String,
            required: false,
        },

    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product;
