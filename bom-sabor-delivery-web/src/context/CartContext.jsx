import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adicionar item ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica se o item já está no carrinho
      const itemExists = prevCart.find((item) => item._id === product._id);
      if (itemExists) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remover item ou diminuir quantidade
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  // Calcular total (venda)
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export const useCart = () => useContext(CartContext);