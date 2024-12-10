import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You could also send a request to the backend to update order status here
    // axios.post("http://localhost:3000/api/orders/update", { status: "success" });

    // Navigate to another page (like Home) after a short delay, if needed
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-semibold text-green-600">Payment Successful!</h2>
      <p className="mt-4 text-lg">Thank you for your purchase. Your order is confirmed.</p>
      <p className="mt-2 text-sm text-gray-600">You will be redirected to the homepage shortly.</p>
      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
