// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Se você mudou a porta no .env da API, ajuste aqui (ex: 5001)
  baseURL: 'http://localhost:5001/api/', 
});

export default api;