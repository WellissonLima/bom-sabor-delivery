import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Rota principal: o Cardápio */}
          <Route path="/" element={<Home />} />

          {/* Rota de Login para o Painel do Dono */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rota do Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Rota do Painel do Dono */}
          <Route 
            path="/admin-bom-sabor" element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
