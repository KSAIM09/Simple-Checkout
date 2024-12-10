const Order = require("../models/Order");
const { stripe } = require("../utils/stripe");
const { CLIENT_URL } = require("../config");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { email, items, totalAmount } = req.body;

  try {
    console.log("Email:", email);
    console.log("Items:", items);
    console.log("Total Amount:", totalAmount);

    // Fetch product details from the database
    const products = await Product.find({ '_id': { $in: items.map(item => item.productId) } });

    // Check if all products exist
    if (products.length !== items.length) {
      return res.status(400).json({ error: "One or more products not found" });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: items.map((item) => {
        const product = products.find(p => p._id.toString() === item.productId.toString());
        return {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:5173/payment-success`,
      cancel_url: `http://localhost:5173/payment-failed`, // Updated cancel URL
    });

    console.log("Stripe session created:", session);

    // Create new order
    const newOrder = new Order({
      email,
      items,
      totalAmount,
      paymentIntentId: session.payment_intent,
    });

    await newOrder.save();

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating order:", error.message); // Log the error message
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const event = req.body;

  try {
    const { type, data } = event;

    if (type === "checkout.session.completed") {
      const session = data.object;
      const order = await Order.findOne({ paymentIntentId: session.payment_intent });

      if (order) {
        order.paymentStatus = "success";
        await order.save();
      }
    }

    res.status(200).send("Webhook handled");
  } catch (error) {
    res.status(500).send("Webhook handling failed");
  }
};
