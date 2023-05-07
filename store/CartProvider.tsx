import React, {FC, ReactNode, createContext, useContext, useState} from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
});

// Define a custom hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}

// Create a provider component to wrap the app with the cart context
const CartProvider: FC<{children: ReactNode}> = ({children}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    const index = cartItems.findIndex(i => i.id === item.id);
    if (index > -1) {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += item.quantity;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id !== id ? item : {...item, quantity: quantity},
      ),
    );
  };

  const contextValue: CartContextType = {
    cartItems,
    addItem,
    removeItem,
    updateItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
