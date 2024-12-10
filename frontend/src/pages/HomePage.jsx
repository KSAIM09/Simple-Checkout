import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // To link to cart and checkout

const HomePage = () => {
  // State to store products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // Backend endpoint to get products
      .then((response) => {
        setProducts(response.data);  // Store the products in state
        setLoading(false);  // Set loading to false after fetching data
      })
      .catch((err) => {
        setError("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  // If loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              src="https://via.placeholder.com/150" // Placeholder image (replace with real image URL from product data)
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-xl font-bold text-gray-800">${product.price}</p>
              <Link
                to={`/cart`} // You can add logic here to add the product to the cart
                className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
