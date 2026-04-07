require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ Conecção com o MongoDB estabelescida com sucesso!');
})
.catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);

// app.get('/api/test', (req, res) => {
//     res.status(200).json({
//         message: 'A rota de teste da API está funcionando perfeitamente',
//         timestamp: new Date().toISOString()
//     });
// });

app.get('/', (req, res) => {
    res.json({ message: 'API Bom Sabor Online!' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada.'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado com o servidor!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`✨ Para testar: abra http://localhost:${PORT}/api/test no seu navegador ou via ferramenta como Postman.`);
});