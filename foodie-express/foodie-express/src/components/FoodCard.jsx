import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  const isAvailable = Boolean(food.is_available);

  return (
    <div className="card bg-white border border-orange-100 shadow-sm hover:shadow-lg transition overflow-hidden">

      <figure className="h-44">
        <img
          src={
            food.image_url ||
            food.image ||
            "https://placehold.co/600x400?text=Food"
          }
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4">

        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg">
            {food.name}
          </h3>

          {!isAvailable && (
            <span className="badge badge-error badge-outline">
              Unavailable
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {food.description}
        </p>

        <p className="text-xs text-gray-400">
          {food.category_name || food.restaurantName}
        </p>

        <div className="flex items-center justify-between mt-2">

          <span className="font-bold text-orange-600">
            RM {Number(food.price).toFixed(2)}
          </span>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(food)}
            disabled={!isAvailable}
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>
      </div>
    </div>
  );
}

export default FoodCard;