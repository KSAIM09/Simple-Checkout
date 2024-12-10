const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  paymentIntentId: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
