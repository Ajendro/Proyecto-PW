import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    address: '',
    zip: '',
    ownerName: '',
    _id: ''
  });

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload._id;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const _id = getUserIdFromToken();
    if (_id) {
      setFormData(prevData => ({
        ...prevData,
        _id: _id
      }));
    }

    // Cargar los productos desde el almacenamiento local
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData._id) {
      alert('Error: ID del usuario no encontrado.');
      return;
    }

    try {
      // Enviar datos del formulario y del carrito al servidor
      const response = await fetch('http://localhost:4000/apipaymethod/paymentMethodscreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, cartItems })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert('Método de pago registrado con éxito.');
      // Limpiar el almacenamiento local después de enviar el formulario
      localStorage.removeItem('cartItems');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar el formulario. Verifica la consola para más detalles.');
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Pago</h3>
        <p className="text-sm text-muted-foreground">Ingresa tu información de pago</p>
      </div>
      <div className="p-6">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Formulario de información de pago */}
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">Correo electrónico</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="cardNumber">Número de tarjeta</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="cardNumber"
              placeholder="Ingresa el número de tu tarjeta"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="expiry">Vencimiento</label>
              <select
                id="expiry"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.expiry}
                onChange={handleChange}
              >
                <option value="">MM/AA</option>
                <option value="01/24">01/24</option>
                <option value="02/24">02/24</option>
                <option value="03/24">03/24</option>
                <option value="04/24">04/24</option>
                <option value="05/24">05/24</option>
                <option value="06/24">06/24</option>
                <option value="07/24">07/24</option>
                <option value="08/24">08/24</option>
                <option value="09/24">09/24</option>
                <option value="10/24">10/24</option>
                <option value="11/24">11/24</option>
                <option value="12/24">12/24</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="cvc">CVC</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="name">Nombre</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="name"
              placeholder="Nombre del titular de la tarjeta"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="address">Dirección</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="address"
              placeholder="Dirección de facturación"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="zip">Código Postal</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="zip"
                placeholder="Código Postal"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="ownerName">Nombre del Propietario</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="ownerName"
                placeholder="Nombre del propietario"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Registrar Método de Pago
          </button>
        </form>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Productos en el carrito</h4>
          <ul>
            {cartItems.length === 0 ? (
              <li>No hay productos en el carrito.</li>
            ) : (
              cartItems.map(item => (
                <li key={item.product._id} className="flex items-center justify-between mb-2">
                  <img
                    src={item.product.productImage}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover mr-4 rounded-md"
                  />
                  <div className="flex-grow">
                    <span className="block text-sm">{item.product.name} - ${item.product.price.toFixed(2)}</span>
                    <span className="text-sm">Cantidad: {item.quantity}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
