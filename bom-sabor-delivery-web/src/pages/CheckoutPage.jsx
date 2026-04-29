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
import { useNavigate } from "react-router-dom";
import { isStoreOpen } from "../utils/businessHours";

const DELIVERY_LOCATIONS = [
  {id: 'centro', name: 'Centro', fee: 2.00},
  {id: 'bairros', name: 'Bairros', fee: 3.00},
  {id: 'zona-rural', name: 'Zona Rural', fee: 5.00},
  {id: 'retirada-no-local', name: 'Retirada no Local (Grátis)', fee: 0.00},
]

export default function CheckoutPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = selectedLocation ? selectedLocation.fee : 0;
  const totalWithDelivery = cartTotal + deliveryFee;

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    referencia: "",
    pagamento: "Cartão de Credito/Débito (Na entrega)",
  });

  const handleFinalizarPedido = () => {
    if (!isStoreOpen()) {
      return alert("Desculpe, nossa cozinha está fechada no momento. Por favor, volte durante nosso horário de funcionamento (Sexta a Domingo, das 18h às 22h).");
    }
    if (!formData.nome || !formData.endereco) {
      alert("Por favor, preencha seu nome e endereço!");
    }

    const mensagemItens = cart
      .map((item) => {
        // 1. Verificamos se o item tem sabores selecionados (Pizza Montada)
        const sabores =
          item.selectedFlavors && item.selectedFlavors.length > 0
            ? `%0A   _Sabores: ${item.selectedFlavors.join(" + ")}_`
            : "";

        // 2. Montamos a linha do item (Quantidade x Nome + Sabores se houver)
        return `*${item.quantity}x ${item.name}*${sabores}%0A   (R$ ${(item.price * item.quantity).toFixed(2)})`;
      })
      .join("%0A%0A"); // Duas quebras de linha entre itens para ficar mais legível

    const textoMensagem =
      `*NOVO PEDIDO - BOM SABOR*%0A%0A` +
      `*Cliente:* ${formData.nome}%0A` +
      `*Endereço:* ${formData.endereco}%0A` +
      `*Referência:* ${formData.referencia}%0A` +
      `*Pagamento:* ${formData.pagamento}%0A%0A` +
      `*ITEM:*%0A${mensagemItens}%0A%0A` +
      `*Local:* ${selectedLocation?.name || 'Não informado'}%0A` +
      `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2)}%0A` +
      `*TOTAL: R$ ${totalWithDelivery.toFixed(2)}*`;

    const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER;
    window.open(
      `https://wa.me/${numeroWhatsApp}?text=${textoMensagem}`,
      "_blank",
    );

    clearCart();
    navigate("/");

    alert("Pedido enviado! O carrinho foi limpo e você será redirecionado para o cardápio.");
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

          <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-pizza-red" /> Onde Entregamos
              </h3>

              <div className="grid gap-2">
                {DELIVERY_LOCATIONS.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => setSelectedLocation(location)}
                    className={`flex justify-between items-center p-4 rounded-xl transition-all border-2 ${
                      selectedLocation?.id === location.id
                        ? "border-pizza-red bg-red-50 text-pizza-red"
                        : "border-gray-100 hover:border-gray-200 text-gray-600"
                    }`}
                    >
                      <span className="font-bold">{location.name}</span>
                      <span className="text-sm">
                        {location.fee === 0 ? "Grátis" : `R$ ${location.fee.toFixed(2)}`}
                      </span>
                    </button>
                ))}
              </div>
          </div>

          {/*RESUMO DE VALORES (No lado direito) */}
          <div className="space-y-2 mb-6 px-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal do Carrinho:</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Taxa de Entrega:</span>
              <span>R$ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-dark-charcoal border-t pt-2">
              <span>Total:</span>
              <span>R$ {totalWithDelivery.toFixed(2)}</span>
            </div>
          </div>

          {/* BOTÃO FINALIZAR (No lado direito) */}
          <button
            disabled={!isStoreOpen()}
            onClick={handleFinalizarPedido}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl mt-6 flex items-center justify-center gap-2 ${!isStoreOpen() ? "bg-pizza-red opacity-50" : "bg-gray-400 transition-colors cursor-not-allowed"}`}
          >
            {isStoreOpen() ? "FINALIZAR PEDIDO NO WHATSAPP" : "COZINHA FECHADA"}
            <CheckCircle size={24} /> CONCLUIR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
