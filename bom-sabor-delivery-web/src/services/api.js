// src/services/api.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
console.log("Conectando na API em:", apiUrl || "Localhost (Variável não encontrada)");

const api = axios.create({
  // Se você mudou a porta no .env da API, ajuste aqui (ex: 5001)
  baseURL: apiUrl || 'http://localhost:5001/api/',
});

export default api;