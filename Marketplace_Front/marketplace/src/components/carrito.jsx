import React from 'react';
import { Link } from "react-router-dom";


const Cart = ({ cartItems, setCartItems }) => {
  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0)); // Ensure quantity is not negative
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      <ul className="mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="flex items-center justify-between mb-2 border-b pb-2">
            <div className="flex-grow">
              <span className="block text-sm">{item.name} - ${item.price.toFixed(2)}</span>
              <div className="flex items-center mt-1">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-l-md"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">Total:</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
            <Link
        to="/pago" // Cambia "/pago" por la ruta a la que deseas redirigir
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Pagar
      </Link>
    </div>
  );
};

export default Cart;
