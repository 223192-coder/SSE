
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import { allFoods, categories } from "../data/mockData";
import FoodCard from "../components/FoodCard";

function SearchPage() {

  const [params] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [category, setCategory] = useState(
    params.get("category") || "All"
  );

  const filteredFoods = allFoods.filter((food) => {

    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">

      <h1 className="text-3xl font-bold">
        Find Your Favourite Food
      </h1>

      <p className="text-gray-500 mt-2">
        Search through our available menu items.
      </p>

      <label className="input input-bordered flex items-center gap-3 mt-8 max-w-2xl">
        <Search size={20} />

        <input
          placeholder="Search food or restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="flex gap-2 flex-wrap mt-6">

        <button
          onClick={() => setCategory("All")}
          className={`btn btn-sm ${category === "All" ? "btn-primary" : "btn-outline"}`}
        >
          All
        </button>

        {categories.map((item) => (

          <button
            key={item.id}
            onClick={() => setCategory(item.name)}
            className={`btn btn-sm ${category === item.name ? "btn-primary" : "btn-outline"}`}
          >
            {item.emoji} {item.name}
          </button>

        ))}

      </div>

      <div className="mt-10">

        <h2 className="font-bold text-xl mb-5">
          {filteredFoods.length} food items found
        </h2>

        {filteredFoods.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}

          </div>

        ) : (

          <p className="text-gray-500 py-12">
            No food items match your search.
          </p>

        )}

      </div>

    </main>
  );
}

export default SearchPage;
