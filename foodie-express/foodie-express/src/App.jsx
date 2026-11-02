
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import SearchPage from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <CartProvider>

      <BrowserRouter>

        <div className="min-h-screen flex flex-col">

          <Navbar />

          <div className="flex-1">

            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/restaurants" element={<Restaurants />} />

              <Route
                path="/restaurant/:id"
                element={<RestaurantDetails />}
              />

              <Route path="/search" element={<SearchPage />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/checkout" element={<Checkout />} />

              <Route
                path="/tracking/:id"
                element={<OrderTracking />}
              />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/profile" element={<Profile />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                path="*"
                element={
                  <div className="text-center py-24">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="mt-3">Page not found.</p>
                  </div>
                }
              />

            </Routes>

          </div>

          <footer className="bg-stone-900 text-white p-8 text-center">
            <h2 className="text-xl font-bold text-orange-400">
              FoodieExpress
            </h2>

            <p className="text-gray-400 mt-2">
              Good food. Fast delivery. Happy moments.
            </p>

            <p className="text-gray-500 text-sm mt-5">
              © 2026 FoodieExpress. All rights reserved.
            </p>
          </footer>

        </div>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;
