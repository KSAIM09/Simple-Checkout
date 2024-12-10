const express = require("express");
const { createOrder, handleStripeWebhook } = require("../controllers/orderController"); // Correct path

const router = express.Router();

// Ensure the handler is properly assigned
router.post("/create", createOrder);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

module.exports = router;
