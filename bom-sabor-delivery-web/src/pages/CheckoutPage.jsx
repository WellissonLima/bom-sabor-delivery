import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    referencia: "",
    pagamento: "Cartão de Credito/Débito (Na entrega)",
  });

  const handleFinalizarPedido = () => {
    if (!formData.nome || !formData.endereco) {
      alert("Por favor, preencha seu nome e endereço!");
    }

    const mensagemItens = cart
      .map(
        (item) =>
          `*${item.quantity}x ${item.name}* (R$ ${(item.price * item.quantity).toFixed(2)})`,
      )
      .join("%0A");

    const textoMensagem =
      `*NOVO PEDIDO - BOM SABOR*%0A%0A` +
      `*Cliente:* ${formData.nome}%0A` +
      `*Endereço:* ${formData.endereco}%0A` +
      `*Referência:* ${formData.referencia}%0A` +
      `*Pagamento:* ${formData.pagamento}%0A%0A` +
      `*ITEM:%0A${mensagemItens}%0A%0A` +
      `*TOTAL: R$ ${cartTotal.toFixed(2)}*`;

    const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER;
    window.open(
      `https://wa.me/${numeroWhatsApp}?text=${textoMensagem}`,
      "_blank",
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-dark-charcoal">
          Seu carrinho está vazio! 🍕
        </h2>
        <Link
          to="/"
          className="text-pizza-red font-bold flex items-center gap-2 hover:underline"
        >
          <ArrowLeft size={20} /> Voltar para o cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray-bg p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 mb-8 hover:text-pizza-red transition-colors"
        >
          <ArrowLeft size={20} /> Voltar ao cardápio
        </Link>

        <h1 className="text-3xl font-black text-dark-charcoal mb-8">
          Finalizar Pedido 🛒
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LADO ESQUERDO: FORMULÁRIO */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Seu Nome Completo"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-pizza-red outline-none"
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Endereço (Rua, Número, Bairro)"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-pizza-red outline-none"
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ponto de Referência"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-pizza-red outline-none"
              onChange={(e) =>
                setFormData({ ...formData, referencia: e.target.value })
              }
            />

            <select
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-pizza-red outline-none"
              onChange={(e) =>
                setFormData({ ...formData, pagamento: e.target.value })
              }
            >
              <option>Cartão de Crédito/Débito (Na entrega)</option>
              <option>Pix</option>
              <option>Dinheiro (Levar troco)</option>
            </select>
          </div>

          {/* BOTÃO FINALIZAR (No lado direito) */}
          <button
            onClick={handleFinalizarPedido}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl mt-6 flex items-center justify-center gap-2"
          >
            <CheckCircle size={24} /> CONCLUIR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
