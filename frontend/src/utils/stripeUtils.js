/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCartContext();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/orders", {
        email,
        items: cartItems,
        totalAmount: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      });

      const { sessionId } = data;  // Assuming the backend returns a sessionId

      // Redirect to Stripe Checkout
      window.location.href = `http://localhost:3000/checkout/${sessionId}`;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="p-4">
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
      <button
        onClick={handleCheckout}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutPage;
