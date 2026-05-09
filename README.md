# 🍕 Bom Sabor Delivery

Sistema completo de cardápio digital e gerenciamento de pedidos para a **Bom Sabor**, focado em agilidade e facilidade de uso para o cliente e para o administrador.

---

## 🚀 Tecnologias Utilizadas

### Frontend
*   **React.js** com **Vite**: Interface rápida e responsiva.
*   **Tailwind CSS**: Estilização moderna.
*   **Axios**: Consumo da API.
*   **React Router Dom**: Navegação entre cardápio e painel administrativo.

### Backend
*   **Node.js** e **Express**: API robusta e escalável.
*   **Mongoose**: Modelagem de dados para o MongoDB.
*   **Cors**: Gerenciamento de segurança para acesso externo.
*   **Dotenv**: Gerenciamento de variáveis de ambiente.

### Banco de Dados & Deploy
*   **MongoDB Atlas**: Banco de dados NoSQL na nuvem.
*   **Vercel**: Hospedagem do Frontend.
*   **Render**: Hospedagem do Backend.

---

## 🛠️ Funcionalidades

*   **Cardápio Digital**: Visualização de produtos em tempo real.
*   **Painel Administrativo**: Área restrita para cadastro, edição e exclusão de itens (Pizza, Pastéis e Hot Dogs).
*   **Integração WhatsApp**: Envio de pedidos formatados diretamente para o número do estabelecimento.
*   **Gerenciamento de Estoque**: Ativação/Desativação de produtos instantaneamente.

---

## 📦 Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone [https://github.com/WellissonLima/bom-sabor-delivery.git](https://github.com/WellissonLima/bom-sabor-delivery.git) 
```
## Configurar o Back-end
```bash
cd bom-sabor-delivery-api
npm install
# Crie um arquivo .env e adicione:
# MONGODB_URI=seu_link_do_mongodb
# ADMIN_PASSWORD=sua_senha_admin
# PORT=5001
npm start
```
## Configurar o Front-end
```bash
cd ..
cd bom-sabor-delivery-frontend
npm install
# Crie um arquivo .env e adicione:
# VITE_API_URL=http://localhost:5001/api
npm run dev
```
## 🌐 Links do Projeto

*   **Site Oficial [https://bom-sabor-delivery.vercel.app/](https://bom-sabor-delivery.vercel.app/)**
*   **API (Backend)[https://bom-sabor-delivery.onrender.com/](https://bom-sabor-delivery.onrender.com/)**

## 👤 Autor
**Wellisson Boanerges Barros Lima**
_Desenvolvedor Web e Empreendedor_
*   **LinkedIn:** [Wellisson Lima](https://www.linkedin.com/in/wellissonboanergesbarroslima/)
*   **GitHub:** [Wellisson Lima](https://github.com/WellissonLima)