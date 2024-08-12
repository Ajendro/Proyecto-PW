// src/Formpages.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Example from "./components/carrusel";
import Form from "./components/Form";
import Pago from "./components/pago";
import Cart from "./components/carrito";
import Categoria from "./components/categoriaPro";
import ProductList from "./components/products";
import Login from "./components/login/login";
import Aboaut from "./components/about";
import User from "./components/user";
import { useState } from "react";

const Formpages = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/about" element={<Aboaut />} />
        <Route path="/user" element={<User />} />
        <Route 
          path="/carrito" 
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        <Route 
          path="/login" 
          element={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '100vh' 
            }}>
              <Login />
            </div>
          } 
        />
        <Route 
          path="/" 
          element={
            <div>
              <Example />
<<<<<<< HEAD
              <div style={{marginTop:"150px", marginLeft:"150px"}}>
            
              </div>
              
  
=======
              <div style={{ marginTop: "150px", marginLeft: "150px" }}>
                <Categoria />
              </div>
              <ProductList cartItems={cartItems} setCartItems={setCartItems} />
>>>>>>> 54e6dd3e7431cbf0bd7e51b6069a67ef7e3a9e64
            </div>
          }
        />
        <Route 
          path="/pago" 
          element={
            <div style={{ marginLeft: "510px", marginBottom: "40px" }}>
              <Pago />
            </div>
          } 
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default Formpages;
