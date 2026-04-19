const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'O nome do produto é obrigatório'],
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, 'O preço de venda é obrigatório'] 
  },
  prices: {
    P: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    G: { type: Number, default: 0 },
    F: { type: Number, default: 0 }
  },
  maxFlavors: {
    P: { type: Number, default: 1 },
    M: { type: Number, default: 2 },
    G: { type: Number, default: 3 },
    F: { type: Number, default: 4 }
  },
  costPrice: { 
    type: Number, 
    default: 0 // Aqui entra o seu controle de lucro!
  },
  category: { 
    type: String, 
    required: true,
    enum: ['pizza', 'hamburguer', 'bebida', 'sobremesa'],
    default: 'pizza'
  },
  image: { 
    type: String, 
    default: 'default-product.png' 
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  isFlavor: { 
    type: Boolean, 
    default: true
  },
  image: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Product', ProductSchema);