
export const categories = [
  { id: 1, name: "Burgers", emoji: "🍔" },
  { id: 2, name: "Pizza", emoji: "🍕" },
  { id: 3, name: "Rice", emoji: "🍚" },
  { id: 4, name: "Noodles", emoji: "🍜" },
  { id: 5, name: "Drinks", emoji: "🥤" },
  { id: 6, name: "Desserts", emoji: "🍰" },
];

export const restaurants = [
  {
    id: 1,
    name: "Burger House",
    cuisine: "Burgers, Fast Food",
    category: "Burgers",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 2.50,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    featured: true,
    menu: [
      {
        id: 101,
        name: "Classic Beef Burger",
        description: "Juicy beef patty with fresh lettuce and cheese.",
        price: 15.90,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      },
      {
        id: 102,
        name: "Double Cheese Burger",
        description: "Double beef patty with extra cheese.",
        price: 21.90,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800",
      },
    ],
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Pizza, Italian",
    category: "Pizza",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 3.00,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    featured: true,
    menu: [
      {
        id: 201,
        name: "Pepperoni Pizza",
        description: "Classic pizza with mozzarella and pepperoni.",
        price: 25.90,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
      },
      {
        id: 202,
        name: "Cheese Pizza",
        description: "Classic mozzarella cheese pizza.",
        price: 22.90,
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800",
      },
    ],
  },
  {
    id: 3,
    name: "Nasi Lemak House",
    cuisine: "Malaysian, Rice",
    category: "Rice",
    rating: 4.9,
    deliveryTime: "15-25 min",
    deliveryFee: 2.00,
    image: "https://images.unsplash.com/photo-1593357849627-cbbc9fda6b7e?w=800",
    featured: true,
    menu: [
      {
        id: 301,
        name: "Nasi Lemak Ayam",
        description: "Coconut rice with fried chicken, sambal and anchovies.",
        price: 12.90,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",
      },
      {
        id: 302,
        name: "Nasi Lemak Special",
        description: "Traditional nasi lemak with egg and sambal.",
        price: 9.90,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      },
    ],
  },
  {
    id: 4,
    name: "Sweet Treats",
    cuisine: "Desserts, Cakes",
    category: "Desserts",
    rating: 4.6,
    deliveryTime: "20-35 min",
    deliveryFee: 2.50,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    featured: false,
    menu: [
      {
        id: 401,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with creamy frosting.",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      },
    ],
  },
];

export const allFoods = restaurants.flatMap((restaurant) =>
  restaurant.menu.map((food) => ({
    ...food,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    category: restaurant.category,
  }))
);

