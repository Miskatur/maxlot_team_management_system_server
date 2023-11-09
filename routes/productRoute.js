const express = require("express");
const { getAllProduct } = require("../controller/productController");

const router = express.Router();

router.get('/all', getAllProduct)

module.exports = router;