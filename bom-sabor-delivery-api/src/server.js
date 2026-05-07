require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// --- 1. MIDDLEWARES (DEVEM VIR ANTES DAS ROTAS) ---
app.use(cors({
    origin: ['http://localhost:5173', 'https://bom-sabor-online.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // Libera o acesso para o Frontend
app.use(express.json()); // Permite ler JSON no corpo da requisição (ESSENCIAL)
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

// Conexão MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Conexão com o MongoDB estabelecida!'))
.catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err.message));

// --- 2. ROTAS ---

// Rota de Login (Agora depois do express.json())
app.post('/api/login', (req, res) => {
    try {
        const { password } = req.body;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        // Se a senha no .env não existir, avisa no terminal
        if (!ADMIN_PASSWORD) {
            console.error("❌ ERRO: ADMIN_PASSWORD não definida no arquivo .env");
            return res.status(500).json({ message: 'Erro de configuração no servidor.' });
        }

        if (password === ADMIN_PASSWORD) {
            // Retornamos o token que o seu Frontend espera
            res.json({ token: "acesso-autorizado-bom-sabor", success: true });
        } else {
            res.status(401).json({ success: false, message: 'Senha incorreta!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro no servidor.', error: error.message });
    }
});

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API Bom Sabor Online!' });
});

// Middleware para 404
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.'});
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});