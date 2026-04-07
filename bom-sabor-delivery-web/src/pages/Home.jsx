import { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import { Pizza, Ham, Beer, Loader2, ShoppingCart, Plus } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { addToCart, cart } = useCart();

  // Calcula total de itens para o distintivo (badge) do botão flutuante
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-light-gray-bg">
      <Loader2 className="animate-spin text-pizza-red" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-light-gray-bg pb-20">
      {/* Header Estilizado */}
      <header className="bg-white shadow-sm py-8 px-6 mb-8 text-center border-b-4 border-pizza-red">
        <h1 className="text-4xl font-black text-dark-charcoal italic">
          BOM SABOR <span className="text-pizza-red">DELIVERY</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">As melhores pizzas e hambúrgueres de Alcantil</p>
      </header>

      {/* Grid de Produtos */}
      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => {
          // Escolha do ícone baseada na categoria
          const Icon = product.category === 'pizza' ? Pizza : 
                       product.category === 'hamburguer' ? Ham : Beer;

          return (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:scale-[1.02] transition-transform duration-300">
              <div className="h-4 bg-pizza-red" /> {/* Detalhe no topo do card */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <Icon className="text-pizza-red" size={28} />
                  </div>
                  <span className="bg-burger-yellow/20 text-yellow-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-dark-charcoal mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm h-12 line-clamp-2 mb-6">{product.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase">Preço</span>
                    <span className="text-2xl font-black text-green-600">R$ {product.price.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      addToCart(product);
                      setIsCartOpen(true); // Abre o carrinho automaticamente ao adicionar
                    }}
                    className="bg-pizza-red hover:bg-red-600 text-black p-4 rounded-2xl shadow-lg shadow-pizza-red/30 transition-all active:scale-95"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Botão Flutuante do Carrinho (Fixo) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-dark-charcoal text-black p-5 rounded-full shadow-2xl hover:bg-pizza-red transition-colors duration-300 group"
      >
        <ShoppingCart size={32} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-pizza-red group-hover:bg-dark-charcoal text-white border-2 border-white font-black rounded-full w-7 h-7 flex items-center justify-center text-xs animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      {/* Componente do Carrinho Lateral */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}