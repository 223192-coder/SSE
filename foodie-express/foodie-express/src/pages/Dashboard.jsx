
import { useState } from "react";
import { restaurants } from "../data/mockData";

function Dashboard() {

  const [menu, setMenu] = useState(restaurants[0].menu);

  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  function addFood(e) {
    e.preventDefault();

    const food = {
      ...newFood,
      id: Date.now(),
      price: Number(newFood.price),
    };

    setMenu([...menu, food]);

    setNewFood({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  }

  function deleteFood(id) {
    setMenu(menu.filter((food) => food.id !== id));
  }

  const orders = JSON.parse(
    localStorage.getItem("foodie-orders") || "[]"
  );

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold">
        Restaurant Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your restaurant and food menu.
      </p>

      <div className="grid sm:grid-cols-3 gap-5 mt-8">

        <div className="stat bg-orange-50 rounded-2xl">
          <div className="stat-title">Total Menu Items</div>
          <div className="stat-value text-orange-600">{menu.length}</div>
        </div>

        <div className="stat bg-blue-50 rounded-2xl">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-blue-600">{orders.length}</div>
        </div>

        <div className="stat bg-green-50 rounded-2xl">
          <div className="stat-title">Restaurant</div>
          <div className="stat-value text-green-600 text-2xl">Open</div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-12">

        <section>

          <h2 className="text-xl font-bold mb-5">
            Add New Food Item
          </h2>

          <form
            onSubmit={addFood}
            className="bg-white border shadow-sm rounded-2xl p-6 space-y-4"
          >

            <input
              className="input input-bordered w-full"
              placeholder="Food Name"
              value={newFood.name}
              onChange={(e) => setNewFood({...newFood, name: e.target.value})}
              required
            />

            <input
              className="input input-bordered w-full"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Price (RM)"
              value={newFood.price}
              onChange={(e) => setNewFood({...newFood, price: e.target.value})}
              required
            />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Food Description"
              value={newFood.description}
              onChange={(e) => setNewFood({...newFood, description: e.target.value})}
              required
            />

            <input
              className="input input-bordered w-full"
              type="url"
              placeholder="Image URL"
              value={newFood.image}
              onChange={(e) => setNewFood({...newFood, image: e.target.value})}
              required
            />

            <button className="btn btn-primary w-full">
              Add Food
            </button>

          </form>

        </section>

        <section>

          <h2 className="text-xl font-bold mb-5">
            Manage Food Menu
          </h2>

          <div className="space-y-3">

            {menu.map((food) => (

              <div
                key={food.id}
                className="flex justify-between items-center bg-white border rounded-xl p-4 gap-3"
              >

                <div>
                  <h3 className="font-semibold">{food.name}</h3>
                  <p className="text-sm text-orange-600">
                    RM {food.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => deleteFood(food.id)}
                  className="btn btn-error btn-outline btn-sm"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </section>

      </div>

      <section className="mt-12">

        <h2 className="text-xl font-bold mb-5">
          Incoming Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-xl p-5 mb-3">
              <div className="flex justify-between flex-wrap gap-3">
                <span className="font-bold">{order.id}</span>
                <span className="badge badge-warning">{order.status}</span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {order.customer.name} · RM {order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}

      </section>

    </main>
  );
}

export default Dashboard;
