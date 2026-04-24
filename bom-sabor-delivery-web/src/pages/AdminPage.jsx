import { useEffect, useState } from "react";
import api from "../services/api";
// 1. ADICIONADO O EDIT2 NO IMPORT ABAIXO
import { Trash2, PlusCircle, LayoutDashboard, Pizza, Edit2 } from "lucide-react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "pizza",
    price: "",
    prices: { P: "", M: "", G: "", F: "" },
    isFlavor: true,
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("Erro ao carregar produtos!");
    }
  }

  // 2. FUNÇÃO DE EXCLUIR CENTRALIZADA
  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Erro ao excluir!");
      }
    }
  }

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price || "",
      prices: product.prices || { P: "", M: "", G: "", F: "" },
      isFlavor: product.isFlavor,
      image: product.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: Number(newProduct.price) || 0,
        prices: {
          P: Number(newProduct.prices.P) || 0,
          M: Number(newProduct.prices.M) || 0,
          G: Number(newProduct.prices.G) || 0,
          F: Number(newProduct.prices.F) || 0,
        },
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, productData);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/products", productData);
        alert("Produto cadastrado com sucesso!");
      }

      setEditingId(null);
      setNewProduct({
        name: "",
        description: "",
        category: "pizza",
        price: "",
        prices: { P: "", M: "", G: "", F: "" },
        isFlavor: true,
        image: "",
      });
      fetchProducts();
    } catch (err) {
      alert("Erro ao processar operação!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-2 text-dark-charcoal">
          <LayoutDashboard className="text-pizza-red" /> Painel Bom Sabor
        </h1>

        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl shadow-lg mb-12 space-y-4 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
              value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />

            <select className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
              value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
              <option value="pizza">Pizza (Sabores e Tamanhos)</option>
              <option value="hamburguer">Hambúrguer</option>
              <option value="bebida">Bebida / Outros</option>
            </select>

            <input type="text" placeholder="URL da Imagem" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red md:col-span-2"
              value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
          </div>

          <textarea placeholder="Descrição" className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
            value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />

          {newProduct.category === "pizza" ? (
            <div className="bg-red-50 p-4 rounded-xl space-y-3">
              <p className="font-bold text-pizza-red flex items-center gap-2"><Pizza size={18} /> Preços Fixos (R$)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["P", "M", "G", "F"].map((t) => (
                  <div key={t}>
                    <label className="text-xs font-bold text-gray-500 text-center block">Tamanho {t}</label>
                    <input type="number" placeholder="0.00" className="w-full border p-2 rounded-lg"
                      value={newProduct.prices[t]} 
                      onChange={(e) => setNewProduct({ ...newProduct, prices: { ...newProduct.prices, [t]: e.target.value } })} />
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={newProduct.isFlavor} onChange={(e) => setNewProduct({ ...newProduct, isFlavor: e.target.checked })} />
                <span className="text-sm font-medium">Disponível para combinar?</span>
              </label>
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500">Preço Único (R$)</label>
              <input type="number" placeholder="0.00" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
                value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            </div>
          )}

          <button type="submit" className={`w-full font-black py-4 rounded-xl transition-all ${editingId ? "bg-blue-600" : "bg-pizza-red"} text-white`}>
            {editingId ? "SALVAR ALTERAÇÕES" : "ADICIONAR AO SISTEMA"}
          </button>

          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setNewProduct({ name: "", description: "", category: "pizza", price: "", prices: { P: "", M: "", G: "", F: "" }, isFlavor: true, image: "" }); }}
              className="w-full text-gray-500 text-sm mt-2 underline text-center">
              Cancelar Edição
            </button>
          )}
        </form>

        <div className="grid gap-3">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100 hover:border-gray-300 transition-all">
              <div>
                <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-1 rounded text-gray-500 mr-2">{p.category}</span>
                <strong className="text-dark-charcoal">{p.name}</strong>
              </div>
              
              {/* 3. GRUPO DE BOTÕES LIMPO */}
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(p)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => handleDelete(p._id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}