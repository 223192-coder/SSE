
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {

  // Store restaurant data from the database
  const [restaurants, setRestaurants] = useState([]);

  // Store loading and error information
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [minRating, setMinRating] = useState("0");

  // Retrieve restaurants from Express API
  useEffect(() => {

    const fetchRestaurants = async () => {

      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/restaurants");

        if (!response.ok) {
          throw new Error("Failed to retrieve restaurants.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setRestaurants(result.data);

      } catch (err) {
        console.error("Restaurant API error:", err);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();

  }, []);

  // Search and filter restaurants
  let filtered = restaurants.filter((restaurant) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchText) ||
      (restaurant.address || "").toLowerCase().includes(searchText) ||
      (restaurant.description || "").toLowerCase().includes(searchText);

    const matchesRating =
      Number(restaurant.rating) >= Number(minRating);

    return matchesSearch && matchesRating;
  });

  // Sort by rating
  if (sort === "rating") {
    filtered = [...filtered].sort(
      (a, b) => Number(b.rating) - Number(a.rating)
    );
  }

  // Sort by delivery fee
  if (sort === "delivery") {
    filtered = [...filtered].sort(
      (a, b) =>
        Number(a.delivery_fee) - Number(b.delivery_fee)
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">

      <h1 className="text-3xl md:text-4xl font-bold">
        Explore Restaurants
      </h1>

      <p className="text-gray-500 mt-2">
        Find the perfect restaurant for your next meal.
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-8">

        <label className="input input-bordered flex items-center gap-2 md:col-span-1">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select
          className="select select-bordered"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="0">All Ratings</option>
          <option value="4">4.0 and above</option>
          <option value="4.5">4.5 and above</option>
          <option value="4.8">4.8 and above</option>
        </select>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="rating">Highest Rating</option>
          <option value="delivery">Lowest Delivery Fee</option>
        </select>

      </div>

      {/* Loading message */}
      {loading && (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-3 text-gray-500">
            Loading restaurants...
          </p>
        </div>
      )}

      {/* Error message */}
      {!loading && error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Restaurant results */}
      {!loading && !error && (
        <>
          <div className="flex items-center gap-2 mb-6 text-gray-500">
            <SlidersHorizontal size={18} />
            {filtered.length} restaurants found
          </div>

          {filtered.length > 0 ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {filtered.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-20">
              <h2 className="text-xl font-bold">
                No restaurants found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another search or filter.
              </p>
            </div>

          )}
        </>
      )}

    </main>
  );
}

export default Restaurants;
