import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Example from "./components/carrusel";
import Product from "./components/products";
import Categoria from "./components/categoriaPro";
import Form from "./components/Form";
import Carrito from "./components/carrito";
import Pago from "./components/pago";

const Formpages = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Example />
              <div style={{marginTop:"150px", marginLeft:"150px"}}>
              <Categoria/>
              </div>
              <Product /> 
            </div>
          }
        />
        <Route path="/form" element={<Form />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={
            <div style={{marginLeft:"510px",marginBottom:"40px"}}>
            <Pago/>
            </div>
            
        } /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default Formpages;
