import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function PizzaModal({ isOpen, onClose, flavors, onAddToCart }) {
  const [size, setSize] = useState('G'); // Tamanho padrão
  const [selectedFlavors, setSelectedFlavors] = useState([]);

  // Limites e preços (Pegamos do primeiro sabor da lista para simplificar)
  const limits = { P: 1, M: 2, G: 3, F: 4 };
  const currentPrice = flavors[0]?.prices?.[size] || 0;

  if (!isOpen) return null;

  const handleFlavorSelect = (flavorName) => {
    if (selectedFlavors.includes(flavorName)) {
      setSelectedFlavors(selectedFlavors.filter(f => f !== flavorName));
    } else if (selectedFlavors.length < limits[size]) {
      setSelectedFlavors([...selectedFlavors, flavorName]);
    }
  };

  const handleConfirm = () => {
    if (selectedFlavors.length === 0) return alert("Escolha pelo menos 1 sabor!");
    
    onAddToCart({
      _id: `custom-${Date.now()}`,
      name: `Pizza ${size}`,
      category: 'pizza',
      selectedFlavors,
      price: currentPrice,
      quantity: 1
    });
    
    onClose();
    setSelectedFlavors([]);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="bg-pizza-red p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">Montar sua Pizza 🍕</h2>
            <p className="text-sm opacity-90 text-white">Escolha o tamanho e os sabores</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* SELEÇÃO DE TAMANHO */}
          <div className="mb-8">
            <p className="font-bold text-gray-400 uppercase text-xs mb-3">1. Escolha o Tamanho</p>
            <div className="grid grid-cols-4 gap-3">
              {['P', 'M', 'G', 'F'].map(s => (
                <button 
                  key={s}
                  onClick={() => { setSize(s); setSelectedFlavors([]); }}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${size === s ? 'border-pizza-red bg-red-50 text-pizza-red' : 'border-gray-100 text-gray-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* LISTA DE SABORES */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <p className="font-bold text-gray-400 uppercase text-xs">2. Escolha os Sabores ({selectedFlavors.length}/{limits[size]})</p>
              <p className="text-pizza-red font-black text-xl">R$ {currentPrice.toFixed(2)}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {flavors.map(f => (
                <button
                  key={f._id}
                  onClick={() => handleFlavorSelect(f.name)}
                  className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${selectedFlavors.includes(f.name) ? 'border-green-500 bg-green-50' : 'border-gray-50 hover:border-gray-200'}`}
                >
                  <span className="font-medium text-dark-charcoal">{f.name}</span>
                  {selectedFlavors.includes(f.name) && <CheckCircle2 className="text-green-500" size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t bg-gray-50 flex gap-4">
          <button onClick={handleConfirm} className="flex-1 bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-green-700 transition-all">
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
}