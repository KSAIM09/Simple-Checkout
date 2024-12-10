import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You can also update the order status as "failed" here, if needed
    // axios.post("http://localhost:3000/api/orders/update", { status: "failed" });

    // Optionally, redirect after some time
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-semibold text-red-600">Payment Failed!</h2>
      <p className="mt-4 text-lg">Unfortunately, your payment did not go through. Please try again.</p>
      <div className="mt-8">
        <button
          onClick={() => navigate("/checkout")}
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
