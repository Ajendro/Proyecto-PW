import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Example from "./components/carrusel";
import Form from "./components/Form";
import Login from "./components/login/login";

const Formpages = () => {
  return (
    <div>
      <Header />
        <Routes>
            <Route path="/" element={<Example />} />
            <Route path="/form" element={<Form />} />
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

        </Routes>
      <Footer />
    </div>
  
  );
};

export default Formpages;
