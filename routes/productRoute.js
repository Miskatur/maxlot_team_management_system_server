const express = require("express");
const { getAllProduct, createProduct, deleteProduct } = require("../controller/productController");

const router = express.Router();

router.get('/all', getAllProduct)
router.post('/create', createProduct)
router.delete('/remove/:id', deleteProduct)

module.exports = router;