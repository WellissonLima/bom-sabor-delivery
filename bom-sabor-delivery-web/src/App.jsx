import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Rota principal: o Cardápio */}
          <Route path="/" element={<Home />} />

          {/* Rota do Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
