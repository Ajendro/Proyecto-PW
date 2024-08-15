import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems, userId }) => {
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    setCartItems(cartItems.filter(item => item.product._id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4000/apishoppingCart/shoppingCarts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, cartItems, total }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de pago.');
      }

      navigate('/pago');
    } catch (error) {
      console.error('Error al enviar el carrito:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10 mb-10">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      <ul className="mb-4">
        {cartItems.length === 0 ? (
          <li className="text-center">El carrito está vacío.</li>
        ) : (
          cartItems.map(item => (
            <li key={item.product._id} className="flex items-center justify-between mb-2 border-b pb-2">
              <img 
                src={item.product.productImage} // Asegúrate de que este sea el nombre correcto de la propiedad
                alt={item.product.name} 
                className="w-16 h-16 object-cover mr-4 rounded-md"
              />
              <div className="flex-grow">
                <span className="block text-sm">{item.product.name} - ${item.product.price.toFixed(2)}</span>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product._id)}
                    className="px-2 py-1 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product._id)}
                    className="px-2 py-1 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">Total:</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Pagar
      </button>
    </div>
  );
};

export default Cart;
