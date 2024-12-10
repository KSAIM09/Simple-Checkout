const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS
const { MONGO_URI, CLIENT_URL } = require("./config"); // Make sure CLIENT_URL is in your config
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { stripe } = require("./utils/stripe"); // Assuming stripe is initialized in this file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes by default
app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Route to handle redirect to Stripe Checkout
app.get("/checkout/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // If the session is valid, redirect to Stripe's hosted checkout page
    if (session.url) {
      return res.redirect(303, session.url);
    } else {
      return res.status(400).json({ error: "Stripe session not found" });
    }
  } catch (error) {
    console.error("Error redirecting to Stripe checkout:", error);
    return res.status(500).json({ error: "Failed to retrieve Stripe session" });
  }
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
