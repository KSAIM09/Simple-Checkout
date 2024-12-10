import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems } = useCartContext(); // Access cartItems from CartContext

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Shop
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/checkout" className="text-white">
            Checkout
          </Link>
          <div className="relative">
            <Link to="/" className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18c1.104 0 2 .896 2 2v14c0 1.104-.896 2-2 2H3c-1.104 0-2-.896-2-2V5c0-1.104.896-2 2-2z"
                />
              </svg>
            </Link>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
