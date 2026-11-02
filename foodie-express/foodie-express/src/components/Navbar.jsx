
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, Menu, Utensils } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-2 rounded-xl">
              <Utensils size={24} />
            </div>

            <span className="text-xl font-extrabold text-orange-600">
              FoodieExpress
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/restaurants">Restaurants</NavLink>
            </li>
            <li>
              <NavLink to="/orders">My Orders</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-3">

          <Link to="/search" className="btn btn-ghost btn-circle">
            <Search size={21} />
          </Link>

          <Link to="/cart" className="btn btn-ghost btn-circle relative">
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="btn btn-outline btn-primary hidden sm:flex">
            Login
          </Link>

          <Link to="/register" className="btn btn-primary hidden sm:flex">
            Sign Up
          </Link>

          <div className="dropdown dropdown-end md:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu />
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-box shadow-xl z-50 w-48 p-2 mt-3"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
