
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Registration failed.");
      }

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Unable to register. Please try again.");
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join FoodieExpress today!
        </p>

        <div className="space-y-4 mt-8">
          <input
            className="input input-bordered w-full"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="input input-bordered w-full"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="input input-bordered w-full"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="input input-bordered w-full"
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
