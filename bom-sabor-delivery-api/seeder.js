// seeder.js

// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// 2. Importa o Mongoose
const mongoose = require('mongoose');

// 3. Define o Schema do Produto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    category: { type: String, required: true, enum: ['pizza', 'hamburguer', 'bebida'] },
    available: { type: Boolean, default: true }
}, { timestamps: true }); // Adiciona campos createdAt e updatedAt automaticamente

// 4. Cria o Modelo 'Product'
const Product = mongoose.model('Product', productSchema);

// 5. Dados dos produtos para serem cadastrados
const productsToSeed = [
    {
        name: "Pizza Calabresa Grande",
        description: "Deliciosa pizza de calabresa fatiada com cebola, molho de tomate e mussarela.",
        costPrice: 18.00,
        price: 45.90, // Margem de 2.55x
        category: "pizza",
        available: true
    },
    {
        name: "Pizza Mussarela Grande",
        description: "Tradicional pizza de mussarela, molho de tomate e orégano.",
        costPrice: 16.00,
        price: 42.50, // Margem de 2.65x
        category: "pizza",
        available: true
    },
    {
        name: "Pizza Frango c/ Catupiry",
        description: "Pizza de frango desfiado com cremoso Catupiry original.",
        costPrice: 22.00,
        price: 54.90, // Margem de 2.5x
        category: "pizza",
        available: true
    },
    {
        name: "Smash Burger Clássico",
        description: "Dois smash burgers de 90g, queijo cheddar, picles, cebola roxa e maionese da casa no pão brioche.",
        costPrice: 12.00,
        price: 29.90, // Margem de 2.49x
        category: "hamburguer",
        available: true
    },
    {
        name: "Smash Burger Bacon",
        description: "Dois smash burgers de 90g, queijo cheddar, fatias crocantes de bacon e molho barbecue no pão brioche.",
        costPrice: 15.00,
        price: 35.90, // Margem de 2.39x
        category: "hamburguer",
        available: true
    },
    {
        name: "Veggie Burger",
        description: "Hambúrguer de grão de bico, queijo prato, alface, tomate e maionese vegana no pão integral.",  
        costPrice: 14.00,
        price: 32.00, // Margem de 2.28x
        category: "hamburguer",
        available: true
    },
    {
        name: "Coca-Cola Lata",
        description: "Refrigerante Coca-Cola em lata 350ml.",
        costPrice: 3.50,
        price: 10.00, // Margem de 2.85x
        category: "bebida",
        available: true
    },
    {
        name: "Guaraná Antarctica Lata",
        description: "Refrigerante Guaraná Antarctica em lata 350ml.",
        costPrice: 3.00,
        price: 9.00, // Margem de 3x
        category: "bebida",
        available: true
    },
    {
        name: "Água Mineral s/ Gás",
        description: "Garrafa de água mineral natural 500ml.",
        costPrice: 1.50,
        price: 5.00, // Margem de 3.33x
        category: "bebida",
        available: true
    },
    {
        name: "Fanta Laranja Lata",
        description: "Refrigerante Fanta Laranja em lata 350ml.",
        costPrice: 3.20,
        price: 9.50, // Margem de 2.96x
        category: "bebida",
        available: true
    }
];

// 6. Função principal para semear os produtos
async function seedProducts() {
    try {
        // Conecta ao MongoDB usando a URI do .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🎉 Conectado ao MongoDB!');

        // Limpa os produtos existentes para evitar duplicatas em execuções repetidas
        await Product.deleteMany({});
        console.log('🗑️ Todos os produtos existentes foram removidos.');

        // Insere os novos produtos
        await Product.insertMany(productsToSeed);
        console.log(`✅ ${productsToSeed.length} produtos cadastrados com sucesso!`);

        // Exemplo de como consultar para verificar
        const allProducts = await Product.find({});
        console.log('\nProdutos no banco de dados:');
        allProducts.forEach(p => console.log(`- ${p.name} (${p.category}) - R$${p.price.toFixed(2)}`));

    } catch (error) {
        console.error('❌ Erro ao semear os produtos:', error);
        process.exit(1); // Sai com erro
    } finally {
        // Desconecta do MongoDB
        await mongoose.disconnect();
        console.log('👋 Desconectado do MongoDB.');
        process.exit(0); // Sai com sucesso
    }
}

// 7. Chama a função para iniciar o processo de semeadura
seedProducts();