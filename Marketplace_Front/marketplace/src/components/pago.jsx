import React, { useState } from 'react';
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
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/apipaymethod/paymentMethodscreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Form submitted:', data);
      alert('Método de pago registrado con éxito.');

      // Redirige a la página principal después del envío exitoso
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
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email} // Cambiado de userEmail a email
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="cardNumber">
              Número de tarjeta
            </label>
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
              <label className="text-sm font-medium leading-none" htmlFor="expiry">
                Vencimiento
              </label>
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
              <label className="text-sm font-medium leading-none" htmlFor="cvc">
                CVC
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="cvc"
                placeholder="Ingresa tu CVC"
                value={formData.cvc}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="name">
                Nombre en la tarjeta
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="name"
                placeholder="Ingresa el nombre de la tarjeta"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="address">
                Dirección de facturación
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="address"
                placeholder="Ingresa tu dirección de facturación"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="zip">
                Código postal
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="zip"
                placeholder="Ingresa tu código postal"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="ownerName">
              Nombre del titular
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="ownerName"
              placeholder="Ingresa el nombre del titular"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2 w-full mt-4"
          >
            Realizar pago
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;

