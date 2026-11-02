
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Clock, Bike, ChefHat } from "lucide-react";

function OrderTracking() {

  const { id } = useParams();

  const orders = JSON.parse(
    localStorage.getItem("foodie-orders") || "[]"
  );

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/restaurants" className="btn btn-primary mt-5">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const steps = [
    {
      name: "Order Placed",
      icon: CheckCircle,
    },
    {
      name: "Restaurant Confirmed",
      icon: CheckCircle,
    },
    {
      name: "Preparing Food",
      icon: ChefHat,
    },
    {
      name: "Out for Delivery",
      icon: Bike,
    },
    {
      name: "Delivered",
      icon: CheckCircle,
    },
  ];

  const currentStep = 0;

  return (
    <main className="max-w-3xl mx-auto px-5 py-16">

      <div className="text-center">

        <div className="bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <Bike size={40} />
        </div>

        <h1 className="text-3xl font-bold mt-5">
          Your Order is Confirmed!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for ordering with FoodieExpress.
        </p>

        <p className="font-semibold mt-4">
          Order ID: {order.id}
        </p>

      </div>

      <div className="bg-white border rounded-2xl p-6 mt-10 shadow-sm">

        <h2 className="font-bold text-xl mb-8">
          Order Progress
        </h2>

        <ul className="steps steps-vertical w-full">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <li
                key={step.name}
                className={`step ${index <= currentStep ? "step-primary" : ""}`}
              >
                <div className="flex items-center gap-3 py-4">
                  <Icon size={20} />
                  <span className="font-medium">
                    {step.name}
                  </span>
                </div>
              </li>
            );
          })}

        </ul>

        <div className="divider"></div>

        <div className="flex justify-between">
          <span>Payment Method</span>
          <span className="font-semibold">
            {order.customer.payment}
          </span>
        </div>

        <div className="flex justify-between mt-3">
          <span>Total</span>
          <span className="font-bold text-orange-600">
            RM {order.total.toFixed(2)}
          </span>
        </div>

        <div className="mt-5 bg-orange-50 p-4 rounded-xl">
          <div className="flex gap-2 items-center font-semibold">
            <Clock size={18} />
            Delivery Address
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {order.customer.address}
          </p>
        </div>

      </div>

      <Link
        to="/"
        className="btn btn-primary w-full mt-6"
      >
        Back to Homepage
      </Link>

    </main>
  );
}

export default OrderTracking;
