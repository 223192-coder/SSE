
import { Link, useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("foodie-current-user") || "null"
  );

  const orders = JSON.parse(
    localStorage.getItem("foodie-orders") || "[]"
  );

  function logout() {
    localStorage.removeItem("foodie-current-user");
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Please login first</h2>
        <Link to="/login" className="btn btn-primary mt-5">
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-12">

      <h1 className="text-3xl font-bold mb-8">
        My Account
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border p-7">

        <div className="flex items-center gap-4">

          <div className="avatar placeholder">
            <div className="bg-orange-500 text-white rounded-full w-16">
              <span className="text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

        </div>

        <div className="divider"></div>

        <h3 className="font-bold text-lg">Personal Information</h3>

        <div className="mt-4 space-y-3 text-gray-600">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>

        <div className="divider"></div>

        <Link to="/orders" className="btn btn-outline btn-primary w-full">
          My Order History ({orders.length})
        </Link>

        <button
          onClick={logout}
          className="btn btn-error btn-outline w-full mt-4"
        >
          Logout
        </button>

      </div>

    </main>
  );
}

export default Profile;
