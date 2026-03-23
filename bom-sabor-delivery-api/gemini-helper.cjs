const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Inicializa o Gemini com a sua chave do .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  // Captura o que você digitar após o nome do arquivo no terminal
  const prompt = process.argv.slice(2).join(" ");

  if (!prompt) {
    console.log("❌ Por favor, digite o que você precisa. \nExemplo: node gemini-helper.cjs 'Crie um esquema Mongoose para pizzas'");
    return;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("\n--- Resposta do Gemini ---");
    console.log(response.text());
    console.log("--------------------------\n");
  } catch (error) {
    console.error("Erro ao chamar o Gemini:", error.message);
  }
}

run();