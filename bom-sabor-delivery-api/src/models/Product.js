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
  }
});

module.exports = mongoose.model('Product', ProductSchema);