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

const createProduct = async (req, res) => {
    const product = req.body;
    try {
        const result = new Product(product);
        result.save()

        res.status(200).json({
            status: 200,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOneAndDelete({ _id: id })

        res.status(200).json({
            status: 200,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}


module.exports = {
    getAllProduct,
    createProduct,
    deleteProduct
}