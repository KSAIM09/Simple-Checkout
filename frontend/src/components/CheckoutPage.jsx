/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCartContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!email) {
      alert("Please provide an email address.");
      return;
    }

    // Prepare the items for the backend, using productId and quantity
    const itemsForOrder = cartItems.map((item) => ({
      productId: item._id, // Assuming _id is used as the product ID
      quantity: item.quantity,
    }));

    try {
      setLoading(true);

      // Make an API call to create an order on the backend
      const { data } = await axios.post("http://localhost:3000/api/orders/create", {
        email,
        items: itemsForOrder,  // Send the items in the required format
        totalAmount: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      });

      // Assuming the backend returns a session ID for Stripe checkout
      const { sessionId } = data;

      // Redirect to Stripe checkout (or your relevant payment page)
      window.location.href = `http://localhost:3000/checkout/${sessionId}`;
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 w-full border border-gray-300 rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-xl font-medium">Cart Items</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between mt-2">
              <span>{item.name}</span>
              <span>{item.quantity} x ${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-right">
        <h3 className="text-xl font-semibold">
          Total: ${cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}
        </h3>
      </div>
      <button
        onClick={handleCheckout}
        className={`mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
};

export default CheckoutPage;
