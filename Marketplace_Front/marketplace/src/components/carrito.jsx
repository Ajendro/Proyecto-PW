import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Sample data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Camiseta de algodón',
      price: 19.99,
      image: './herramientas/correa.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Pantalón de mezclilla',
      price: 39.99,
      image: './path-to-your-image2.png',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Zapatos deportivos',
      price: 59.99,
      image: './path-to-your-image3.png',
      quantity: 1,
    },
  ]);

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 bg-gray-200 rounded-md" />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Total:</p>
            <p className="font-medium">${total.toFixed(2)}</p>
          </div>
          <Link
            to="/pago" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-10 px-4 py-2 w-full mt-4"
        >
            Proceder al pago
        </Link>

        </div>
      </div>
    </div>
  );
};

export default Cart;
