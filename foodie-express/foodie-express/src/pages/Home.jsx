
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin } from "lucide-react";

import { categories, restaurants, allFoods } from "../data/mockData";
import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";

function Home() {

  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  const featuredFoods = allFoods.slice(0, 4);

  return (
    <main>

      {/* HERO SECTION */}
      <section className="bg-orange-50">

        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-2 items-center gap-10">

          <div>

            <span className="badge badge-warning badge-outline mb-5">
              Delicious food, delivered to you
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Hungry?
              <br />
              <span className="text-orange-500">
                We've got you
              </span>
              <br />
              covered.
            </h1>

            <p className="text-gray-600 mt-5 text-lg max-w-lg">
              Discover amazing restaurants and enjoy your
              favourite meals delivered right to your doorstep.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">

              <div className="flex items-center bg-white border rounded-xl px-4 flex-1 shadow-sm">
                <Search className="text-gray-400" size={20} />

                <input
                  className="input input-ghost w-full focus:outline-none"
                  placeholder="Search restaurants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Link
                to={`/search?q=${encodeURIComponent(search)}`}
                className="btn btn-primary"
              >
                Find Food
              </Link>

            </div>

            <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
              <MapPin size={16} />
              Delicious meals delivered to your location
            </div>

          </div>

          <div className="hidden md:block">

            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
              alt="Delicious food"
              className="w-full h-96 object-cover rounded-3xl shadow-xl"
            />

          </div>

        </div>
      </section>

      {/* FOOD CATEGORIES */}
      <section className="max-w-7xl mx-auto px-5 py-14">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Explore Categories
            </h2>

            <p className="text-gray-500 mt-1">
              What are you craving today?
            </p>
          </div>

        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">

          {categories.map((category) => (

            <Link
              key={category.id}
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="bg-white border rounded-2xl p-4 text-center hover:border-orange-400 hover:shadow-md transition"
            >

              <div className="text-4xl mb-3">
                {category.emoji}
              </div>

              <p className="font-semibold text-sm">
                {category.name}
              </p>

            </Link>

          ))}

        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="max-w-7xl mx-auto px-5 py-10">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Popular Restaurants
            </h2>

            <p className="text-gray-500 mt-1">
              Discover restaurants loved by customers.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="text-orange-600 font-semibold flex items-center gap-2"
          >
            View All <ArrowRight size={18} />
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredRestaurants.slice(0, 4).map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}

          {filteredRestaurants.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No restaurants found.
            </p>
          )}

        </div>

      </section>

      {/* POPULAR FOOD */}
      <section className="bg-orange-50 py-14">

        <div className="max-w-7xl mx-auto px-5">

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Customer Favourites
            </h2>

            <p className="text-gray-500 mt-1">
              Popular dishes you should try.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {featuredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}

          </div>

        </div>
      </section>

      {/* PROMOTION */}
      <section className="max-w-7xl mx-auto px-5 py-16">

        <div className="bg-orange-500 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Your next meal is waiting!
            </h2>

            <p className="mt-3 text-orange-50">
              Explore our restaurants and discover something delicious.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="btn bg-white text-orange-600 border-none hover:bg-orange-100"
          >
            Order Now
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;
