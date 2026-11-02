
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email : email,
          password : password
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed.");
      }

      // Save the JWT token
      localStorage.setItem("foodie-token", result.token);

      // Save the logged-in user's profile information
      localStorage.setItem(
        "foodie-current-user",
        JSON.stringify(result.user)
      );

      alert("Login successful! Welcome to FoodieExpress.");

      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-5 bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl w-full max-w-md p-7"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Welcome Back!
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to your FoodieExpress account.
        </p>

        <div className="space-y-4 mt-8">
          <input
            className="input input-bordered w-full"
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input input-bordered w-full"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-error text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 font-bold">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
