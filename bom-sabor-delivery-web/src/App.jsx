import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Rota principal: o Cardápio */}
          <Route path="/" element={<Home />} />

          {/* Rota do Painel do Dono */}
          <Route path="/admin-bom-sabor" element={<AdminPage />} />

          {/* Rota do Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
