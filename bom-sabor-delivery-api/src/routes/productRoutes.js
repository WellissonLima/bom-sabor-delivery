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

// Rota para ADICIONAR um novo produto
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao adicionar produto', error: err.message });
    }
});

// Rota para REMOVER um produto
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produto removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover produto', error: err.message });
    }
});

module.exports = router;