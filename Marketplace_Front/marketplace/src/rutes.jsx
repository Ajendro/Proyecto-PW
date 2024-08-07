import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Example from "./components/carrusel";
import Product from "./components/products";
import Categoria from "./components/categoriaPro";
import Form from "./components/Form";

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
        
      </Routes>
      <Footer />
    </div>
  );
};

export default Formpages;
