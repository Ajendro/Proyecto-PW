import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Example from "./components/carrusel";


import Form from "./components/Form";

const Formpages = () => {
  return (
    <div>
      <Header />
        <Routes>
            <Route path="/" element={<Example />} />
            <Route path="/form" element={<Form />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default Formpages;
