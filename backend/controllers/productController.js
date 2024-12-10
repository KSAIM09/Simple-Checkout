const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Return products with a 200 status code
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" }); // Handle error
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  // Validation check to ensure all required fields are provided
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    // Create new product instance
    const newProduct = new Product({
      name,
      price,
      description,
    });

    // Save the product to the database
    await newProduct.save();

    // Send response with the created product
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product", details: error.message });
  }
};
