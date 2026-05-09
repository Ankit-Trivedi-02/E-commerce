import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) {
      try {
        setCartItems(JSON.parse(items));
      } catch (err) {
        localStorage.removeItem('cartItems');
      }
    }
  }, []);

  const addToCart = (product, qty) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x.product === product.product);
      let newCart;
      
      if (existItem) {
        newCart = prev.map(x => 
          x.product === existItem.product ? product : x
        );
      } else {
        newCart = [...prev, product];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const newCart = prev.filter(x => x.product !== id);
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
