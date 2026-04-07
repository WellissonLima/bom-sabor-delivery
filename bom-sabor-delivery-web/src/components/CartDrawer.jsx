import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, addToCart, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background escuro ao clicar fora */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Painel do Carrinho */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-pizza-red" /> Meu Pedido
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Seu carrinho está vazio 🍕</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-dark-charcoal">{item.name}</h4>
                    <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg bg-gray-50">
                      <button onClick={() => removeFromCart(item._id)} className="p-1 hover:text-pizza-red"><Minus size={16}/></button>
                      <span className="font-bold px-2">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1 hover:text-green-600"><Plus size={16}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6 mt-4">
          <div className="flex justify-between text-xl font-black mb-6">
            <span>Total:</span>
            <span className="text-green-600">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <Link 
            to="/checkout" 
            onClick={onClose}
            className="block w-full bg-pizza-red text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors"
          >
            Finalizar Pedido
          </Link>
        </div>
      </div>
    </div>
  );
}