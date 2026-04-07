const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
    }
});

// Rota para buscar um produto específico por ID (Útil para detalhes do produto)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o produto', error: err.message });
    }
});

module.exports = router;