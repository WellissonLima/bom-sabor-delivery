import { useEffect, useState } from 'react';
import api from './services/api';
import { Pizza, Ham, Beer, Loader2 } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-orange-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Bom Sabor Delivery 🍕</h1>
        <p className="text-gray-600">O melhor sabor da região, direto na sua mesa.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded uppercase">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-green-600">
                  R$ {product.price.toFixed(2)}
                </span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;