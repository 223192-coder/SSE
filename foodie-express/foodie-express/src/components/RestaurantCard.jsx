
import { Link } from "react-router-dom";
import { Star, Clock, Bike } from "lucide-react";

function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="card bg-white shadow-sm hover:shadow-xl transition duration-300 border border-orange-100 overflow-hidden"
    >
      <figure className="h-48">
        <img
          src={
            restaurant.image_url ||
            "https://placehold.co/600x400?text=Restaurant"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4">

        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">
            {restaurant.name}
          </h3>

          <span className="badge badge-success badge-outline">
            Open
          </span>
        </div>

        <p className="text-gray-500 text-sm">
          {restaurant.address}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">

          <span className="flex items-center gap-1">
            <Star
              size={16}
              className="text-yellow-500 fill-yellow-500"
            />
            {Number(restaurant.rating).toFixed(1)}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />
            {restaurant.estimated_delivery_time || "Delivery time unavailable"}
          </span>

        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Bike size={16} />
          RM {Number(restaurant.delivery_fee).toFixed(2)} delivery
        </div>

      </div>
    </Link>
  );
}

export default RestaurantCard;
