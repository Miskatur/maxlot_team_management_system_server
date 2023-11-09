const Product = require("../models/products.model")

const getAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find()

        res.status(200).json({
            status: 200,
            products: allProducts
        })
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}


module.exports = {
    getAllProduct
}