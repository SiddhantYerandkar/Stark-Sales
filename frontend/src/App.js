import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import SingleProduct from "./components/SingleProduct";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
