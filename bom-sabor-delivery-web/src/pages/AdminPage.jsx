import { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: 'pizza' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      setNewProduct({ name: '', description: '', price: '', category: 'pizza' }); // Limpa form
      fetchProducts(); // Atualiza lista
    } catch (err) { alert("Erro ao adicionar!"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja mesmo remover este item do cardápio?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-2">
          <LayoutDashboard className="text-pizza-red" /> Painel do Bom Sabor
        </h1>

        {/* FORMULÁRIO PARA ADICIONAR */}
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl shadow-sm mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome do Produto" className="border p-3 rounded-lg" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
          <input type="number" placeholder="Preço (ex: 45.90)" className="border p-3 rounded-lg" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
          <textarea placeholder="Descrição" className="border p-3 rounded-lg md:col-span-2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
          <select className="border p-3 rounded-lg" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
            <option value="pizza">Pizza</option>
            <option value="hamburguer">Hambúrguer</option>
            <option value="bebida">Bebida</option>
          </select>
          <button type="submit" className="bg-green-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-700">
            <PlusCircle size={20} /> ADICIONAR AO CARDÁPIO
          </button>
        </form>

        {/* LISTA DE PRODUTOS ATUAIS */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {products.map(product => (
            <div key={product._id} className="flex items-center justify-between p-4 border-b last:border-0">
              <div>
                <p className="font-bold text-dark-charcoal">{product.name}</p>
                <p className="text-sm text-gray-400 italic">R$ {product.price.toFixed(2)}</p>
              </div>
              <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}