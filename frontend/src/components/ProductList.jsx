import { useState, useEffect } from "react";
import axios from "axios";
import { useCartContext } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext(); // Using context to add products to the cart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-10">
      {/* Main Wrapper */}
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
            >
              <img
                src="https://via.placeholder.com/300"
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-4">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
