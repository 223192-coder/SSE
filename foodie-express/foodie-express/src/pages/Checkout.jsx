
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  // Get the restaurant ID from the first cart item
  const restaurantId = cartItems[0]?.restaurant_id;

  const grandTotal = totalPrice + deliveryFee;

  // ======================================
  // GET RESTAURANT DELIVERY FEE
  // ======================================
  useEffect(() => {
    async function fetchRestaurant() {
      if (!restaurantId) {
        setLoadingRestaurant(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/restaurants/${restaurantId}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to retrieve restaurant."
          );
        }

        setDeliveryFee(Number(result.data.delivery_fee) || 0);
      } catch (err) {
        console.error("Restaurant retrieval error:", err);
        setError("Unable to retrieve delivery information. Please try again.");
      } finally {
        setLoadingRestaurant(false);
      }
    }

    fetchRestaurant();
  }, [restaurantId]);

  // ======================================
  // HANDLE FORM INPUTS
  // ======================================
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ======================================
  // PLACE ORDER
  // ======================================
  async function placeOrder(e) {
    e.preventDefault();

    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!restaurantId) {
      setError("Unable to identify the restaurant in your cart.");
      return;
    }

    // Check whether all items belong to one restaurant
    const hasDifferentRestaurants = cartItems.some(
      item => Number(item.restaurant_id) !== Number(restaurantId)
    );

    if (hasDifferentRestaurants) {
      setError("Please order from one restaurant at a time.");
      return;
    }

    // Get login token
    const token = localStorage.getItem("foodie-token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Prepare order data for backend
    const orderData = {
      delivery_address: form.address,
      payment_method:
        form.payment === "Cash on Delivery"
          ? "cash_on_delivery"
          : "online_payment",
      items: cartItems.map(item => ({
        menu_item_id: item.id,
        quantity: Number(item.quantity),
      })),
    };

    try {
      setPlacingOrder(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to place your order."
        );
      }

      // Clear cart only after successful database insertion
      clearCart();

      // Navigate using the actual database order ID
      navigate(`/tracking/${result.data.id}`, {
        state: {
          orderNumber: result.data.order_number,
        },
      });

    } catch (err) {
      console.error("Order placement error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  // ======================================
  // EMPTY CART
  // ======================================
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">
          Your cart is empty
        </h2>

        <Link
          to="/restaurants"
          className="btn btn-primary mt-5"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  // ======================================
  // CHECKOUT PAGE
  // ======================================
  return (
    <main className="max-w-6xl mx-auto px-5 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <form
        onSubmit={placeOrder}
        className="grid md:grid-cols-3 gap-8"
      >

        {/* DELIVERY INFORMATION */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">

          <h2 className="text-xl font-bold mb-5">
            Delivery Information
          </h2>

          <div className="space-y-4">

            <label className="form-control">
              <span className="label-text mb-2">
                Full Name
              </span>

              <input
                className="input input-bordered w-full"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2">
                Phone Number
              </span>

              <input
                className="input input-bordered w-full"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 0123456789"
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2">
                Delivery Address
              </span>

              <textarea
                className="textarea textarea-bordered w-full"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your full delivery address"
                required
                rows="4"
              />
            </label>

            <div className="divider"></div>

            <h2 className="text-xl font-bold">
              Payment Method
            </h2>

            <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer">
              <input
                type="radio"
                className="radio radio-primary"
                name="payment"
                value="Cash on Delivery"
                checked={form.payment === "Cash on Delivery"}
                onChange={handleChange}
              />

              Cash on Delivery
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer">
              <input
                type="radio"
                className="radio radio-primary"
                name="payment"
                value="Online Payment"
                checked={form.payment === "Online Payment"}
                onChange={handleChange}
              />

              Online Payment (Demo Only)
            </label>

          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">

          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="space-y-3 mt-5">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3 text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  RM {(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

          </div>

          <div className="divider"></div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>RM {totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Delivery</span>

            <span>
              {loadingRestaurant
                ? "Loading..."
                : `RM ${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="divider"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>

            <span className="text-orange-600">
              RM {grandTotal.toFixed(2)}
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mt-5 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={placingOrder || loadingRestaurant}
          >
            {placingOrder
              ? "Placing Order..."
              : loadingRestaurant
                ? "Loading Delivery Fee..."
                : "Place Order"}
          </button>

        </div>

      </form>
    </main>
  );
}

export default Checkout;
