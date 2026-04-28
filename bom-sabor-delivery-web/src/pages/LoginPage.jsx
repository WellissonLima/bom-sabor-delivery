import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { password });
      // Salva o token no navegador para ele "lembrar" que você logou
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert("Senha inválida!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <Lock className="text-pizza-red" size={32} />
          </div>
          <h2 className="text-2xl font-black text-dark-charcoal">Área Restrita</h2>
          <p className="text-gray-400 text-sm">Digite a senha para acessar</p>
        </div>

        <input 
          type="password" 
          placeholder="Senha de acesso"
          className="w-full border-2 p-4 rounded-2xl outline-none focus:border-pizza-red mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pizza-red text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all">
          ENTRAR NO PAINEL
        </button>
      </form>
    </div>
  );
}