import { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2, PlusCircle, LayoutDashboard, Pizza } from "lucide-react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "pizza",
    price: "", // Para itens de preço único (bebidas/burgers)
    prices: { P: "", M: "", G: "", F: "" }, // Para os tamanhos fixos
    isFlavor: true, // Se pode ser usado em pizzas meio a meio
    image: "", // Futuramente para upload de imagem
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

      await api.post("/products", productData);
      // Reseta o formulário
      setNewProduct({
        name: "",
        description: "",
        category: "pizza",
        price: "",
        prices: { P: "", M: "", G: "", F: "" },
        isFlavor: true,
      });

      fetchProducts();
      alert("Produto cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao adicionar produto!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-2 text-dark-charcoal">
          <LayoutDashboard className="text-pizza-red" /> Painel Bom Sabor
        </h1>

        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-2xl shadow-lg mb-12 space-y-4 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome (Ex: Calabresa ou Coca-Cola)"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="URL da Imagem (Ex: https://link-da-foto.jpg)"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red md:col-span-2"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <select
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="pizza">Pizza (Sabores e Tamanhos)</option>
              <option value="hamburguer">Hambúrguer</option>
              <option value="bebida">Bebida / Outros</option>
            </select>
          </div>

          <textarea
            placeholder="Descrição dos ingredientes"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          {/* CAMPOS DINÂMICOS BASEADOS NA CATEGORIA */}
          {newProduct.category === "pizza" ? (
            <div className="bg-red-50 p-4 rounded-xl space-y-3">
              <p className="font-bold text-pizza-red flex items-center gap-2">
                <Pizza size={18} /> Preços Fixos por Tamanho (R$)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["P", "M", "G", "F"].map((t) => (
                  <div key={t}>
                    <label className="text-xs font-bold text-gray-500">
                      Tamanho {t}
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full border p-2 rounded-lg"
                      value={newProduct.prices[t]}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          prices: { ...newProduct.prices, [t]: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newProduct.isFlavor}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, isFlavor: e.target.checked })
                  }
                />
                <span className="text-sm font-medium">
                  Disponível para combinar sabores?
                </span>
              </label>
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500">
                Preço Único (R$)
              </label>
              <input
                type="number"
                placeholder="Ex: 15.00"
                className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pizza-red"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pizza-red text-white font-black py-4 rounded-xl hover:bg-red-600 transition-all shadow-md"
          >
            ADICIONAR AO SISTEMA
          </button>
        </form>

        {/* LISTAGEM SIMPLIFICADA */}
        <div className="grid gap-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100"
            >
              <div>
                <span className="text-xs font-bold uppercase bg-gray-100 px-2 py-1 rounded text-gray-500 mr-2">
                  {p.category}
                </span>
                <strong className="text-dark-charcoal">{p.name}</strong>
              </div>
              <button
                onClick={async () => {
                  if (window.confirm("Excluir?")) {
                    await api.delete(`/products/${p._id}`);
                    fetchProducts();
                  }
                }}
                className="text-gray-400 hover:text-red-500 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
