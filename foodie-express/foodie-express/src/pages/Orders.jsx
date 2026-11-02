
import { Link } from "react-router-dom";

function Orders() {

  const orders = JSON.parse(
    localStorage.getItem("foodie-orders") || "[]"
  );

  return (
    <main className="max-w-5xl mx-auto px-5 py-12">

      <h1 className="text-3xl font-bold">
        My Orders
      </h1>

      <p className="text-gray-500 mt-2">
        Review your previous orders.
      </p>

      <div className="space-y-5 mt-8">

        {orders.length === 0 ? (

          <div className="text-center py-16 bg-white rounded-2xl border">
            <h2 className="text-xl font-bold">
              No orders yet
            </h2>

            <Link to="/restaurants" className="btn btn-primary mt-5">
              Start Ordering
            </Link>
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >

              <div className="flex flex-wrap justify-between gap-3">

                <div>
                  <h2 className="font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {order.createdAt}
                  </p>
                </div>

                <span className="badge badge-warning">
                  {order.status}
                </span>

              </div>

              <div className="divider"></div>

              {order.items.map((item) => (
                <p key={item.id} className="text-sm py-1">
                  {item.name} × {item.quantity}
                </p>
              ))}

              <div className="flex justify-between mt-5">

                <span className="font-bold">
                  RM {order.total.toFixed(2)}
                </span>

                <Link
                  to={`/tracking/${order.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Track Order
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
}

export default Orders;
