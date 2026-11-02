
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodie-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "foodie-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function addToCart(food) {
    setCartItems((previousItems) => {

      const existingItem = previousItems.find(
        (item) => item.id === food.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousItems,
        { ...food, quantity: 1 },
      ];
    });
  }

  function removeFromCart(foodId) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== foodId)
    );
  }

  function updateQuantity(foodId, quantity) {
    if (quantity < 1) {
      removeFromCart(foodId);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === foodId
          ? { ...item, quantity }
          : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
