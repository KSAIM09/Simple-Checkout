const express = require("express");
const { getProducts, createProduct } = require("../controllers/productController");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST create a new product
router.post("/create", createProduct);

module.exports = router;
