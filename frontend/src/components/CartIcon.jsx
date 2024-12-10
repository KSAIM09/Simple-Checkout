
import { useCartContext } from "../context/CartContext";

const CartIcon = () => {
  const { cartItems } = useCartContext();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      <button className="text-xl font-bold">
        🛒 Cart ({cartCount})
      </button>
    </div>
  );
};

export default CartIcon;
