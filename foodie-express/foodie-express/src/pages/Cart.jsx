
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 2.50 : 0;
  const grandTotal = totalPrice + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <ShoppingBag size={70} className="mx-auto text-orange-300" />

        <h2 className="text-3xl font-bold mt-5">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Discover delicious food and start ordering!
        </p>

        <Link to="/restaurants" className="btn btn-primary mt-6">
          Explore Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 py-12">

      <h1 className="text-3xl font-bold mb-8">
        My Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-4">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">

                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  RM {item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-3 mt-4">

                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus size={14} />
                  </button>

                </div>
              </div>

              <div className="flex sm:flex-col items-center justify-between">

                <p className="font-bold text-orange-600">
                  RM {(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="card bg-white shadow-md border h-fit">

          <div className="card-body">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span>RM {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>RM {deliveryFee.toFixed(2)}</span>
            </div>

            <div className="divider"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">
                RM {grandTotal.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout" className="btn btn-primary mt-5">
              Proceed to Checkout
            </Link>

            <Link to="/restaurants" className="btn btn-ghost">
              Continue Shopping
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
