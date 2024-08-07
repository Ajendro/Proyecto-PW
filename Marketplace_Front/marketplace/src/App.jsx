import Footer from "./components/footer";
import Header from "./components/header";
import Example from "./components/carrusel";
import Products from "./components/products";
import Form from "./components/Form";
import CategoriaPro from "./components/categoriaPro";

export default function App() {
  return (
   <div>
    <Header />
    <div>
    <Example />
    <div style={{marginTop:"150px", marginLeft:"200px" }}>
    <CategoriaPro/>
    </div>
    <Products/>
    <Form />
    <Footer />
    </div>
   </div>
   
  )
}
