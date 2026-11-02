import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Clock, Bike, ArrowLeft } from "lucide-react";

import FoodCard from "../components/FoodCard";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Retrieve restaurant details and menu simultaneously
        const [restaurantResponse, menuResponse] = await Promise.all([
          fetch(`/api/restaurants/${id}`),
          fetch(`/api/restaurants/${id}/menu`),
        ]);

        if (!restaurantResponse.ok || !menuResponse.ok) {
          throw new Error("Unable to retrieve restaurant information.");
        }

        const restaurantResult = await restaurantResponse.json();
        const menuResult = await menuResponse.json();

        if (!restaurantResult.success || !menuResult.success) {
          throw new Error("Failed to load restaurant information.");
        }

        setRestaurant(restaurantResult.data);

        // Convert database values into the format used by the frontend
        const formattedMenu = menuResult.data.map((food) => ({
          ...food,
          price: Number(food.price),
          image: food.image_url,
          restaurantName: restaurantResult.data.name,
        }));

        setMenuItems(formattedMenu);

      } catch (err) {
        console.error("Restaurant details error:", err);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // Loading screen
  if (loading) {
    return (
      <div className="text-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-3 text-gray-500">
          Loading restaurant details...
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">
          Unable to load restaurant
        </h1>

        <p className="text-gray-500 mt-2">{error}</p>

        <Link to="/restaurants" className="btn btn-primary mt-5">
          Back to Restaurants
        </Link>
      </div>
    );
  }

  // Restaurant not found
  if (!restaurant) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">
          Restaurant not found
        </h1>

        <Link to="/restaurants" className="btn btn-primary mt-5">
          Back to Restaurants
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">

      <Link
        to="/restaurants"
        className="flex items-center gap-2 text-orange-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Restaurants
      </Link>

      {/* Restaurant banner */}
      <div className="rounded-3xl overflow-hidden">
        <img
          src={
            restaurant.image_url ||
            "https://placehold.co/1200x500?text=Restaurant"
          }
          alt={restaurant.name}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>

      {/* Restaurant information */}
      <div className="py-8">

        <h1 className="text-3xl md:text-4xl font-bold">
          {restaurant.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {restaurant.description}
        </p>

        <p className="text-gray-500 mt-2">
          {restaurant.address}
        </p>

        <div className="flex flex-wrap gap-6 mt-5 text-sm">

          <span className="flex items-center gap-2">
            <Star className="text-yellow-500" size={18} />
            {Number(restaurant.rating).toFixed(1)}
          </span>

          <span className="flex items-center gap-2">
            <Clock size={18} />
            {restaurant.estimated_delivery_time || "Time unavailable"}
          </span>

          <span className="flex items-center gap-2">
            <Bike size={18} />
            RM {Number(restaurant.delivery_fee).toFixed(2)} delivery
          </span>

        </div>
      </div>

      <div className="divider"></div>

      {/* Restaurant menu */}
      <h2 className="text-2xl font-bold mb-6">
        Our Menu
      </h2>

      {menuItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold">
            No menu items available
          </h3>

          <p className="text-gray-500 mt-2">
            This restaurant has not added any food items yet.
          </p>
        </div>
      )}

    </main>
  );
}

export default RestaurantDetails;