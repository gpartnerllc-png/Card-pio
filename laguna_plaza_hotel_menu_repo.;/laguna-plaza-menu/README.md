# 🏨 Laguna Plaza Hotel & Restaurante Mandi - Cardápio Digital Interativo 🍽️

Aplicação Web full-stack moderna desenvolvida em **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, e **Framer Motion** que traz 100% das opções dos cardápios do **Laguna Plaza Hotel** e **Restaurante Mandi**.

## 🚀 Recursos
- 🍕 **Cardápio Completo Sem Faltas**: Entradas, Pratos Principais, Grelhados Customizáveis, Petiscos, Massas, Pizzas, Hambúrgueres, Sobremesas, Drinks, Bebidas e Menu Executivo Companhia Aérea.
- 🥩 **Customizador de Grelhados**: Seleção dinâmica de até 3 guarnições e 1 molho.
- 🍝 **Customizador de Massas**: Escolha do tipo de massa (Espaguete, Penne, Talharim) e molho.
- 🛒 **Carrinho de Compras em Tempo Real**: Cálculo de taxa de serviço (10%), subtotal e total com suporte a pedidos via WhatsApp.
- 🔍 **Busca e Filtro por Categoria**: Encontre rapidamente qualquer item do cardápio.
- 📱 **100% Responsivo e PWA Ready**: Otimizado para smartphones, tablets e desktop.

## 🛠️ Tecnologias Utilizadas
- **Framework**: Next.js 14 (React 18 + TypeScript)
- **Estilização**: Tailwind CSS + Lucide React Icons
- **Animações**: Framer Motion
- **Estado**: React Context / Hooks

## 💻 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/usuario/laguna-plaza-menu.git
cd laguna-plaza-menu
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra `http://localhost:3000` no seu navegador.

## 📄 Estrutura de Arquivos
```
laguna-plaza-menu/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── menu/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── CategoryNav.tsx
│   │   ├── Header.tsx
│   │   ├── MenuCard.tsx
│   │   └── CartDrawer.tsx
│   ├── data/
│   │   └── menu.json
│   └── types/
│       └── menu.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```
