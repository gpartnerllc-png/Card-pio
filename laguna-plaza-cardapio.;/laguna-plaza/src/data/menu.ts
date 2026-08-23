import type { MenuCategory, MenuItem } from "./types";

export const CATEGORIES: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas & Sopas",
    items: [
      { name: "Antepasto de Beringela", price: 10, description: "Antepasto de beringela acompanhado de torradas." },
      { name: "Caesar Salad", price: 37, description: "Alfaces variadas, frango grelhado, croutons e parmesão." },
      { name: "Salada Mandi", price: 32, description: "Mix de folhas, tomates, picles caseiros, manga e manjericão." },
      { name: "Bruschetas Caprese", price: 28, description: "Pão ao alho, molho de tomate, muçarela e manjericão." },
      { name: "Minestrone", price: 43, description: "Sopa de filé, legumes, espaguete e manjericão." },
      { name: "Canja de Galinha", price: 35, description: "Sopa de legumes, frango, arroz e salsa." },
      { name: "Croquete de Costela", price: 45, description: "Costela desfiada empanada em panko com maionese da casa." },
      { name: "Omelete Tradicional", price: 30, description: "Ovos, presunto, muçarela, orégano e salada." },
      { name: "Omelete de Legumes", price: 35, description: "Ovos, legumes, muçarela, orégano e salada." },
    ],
  },
  {
    id: "pratos_principais",
    label: "Pratos Principais",
    items: [
      { name: "Carne de Sol Tambaú", price: 71, description: "Carne de sol, mandioca frita, arroz, vinagrete e queijo coalho." },
      { name: "Parmegiana de Filé", price: 62, description: "Filé empanado, presunto, queijo, molho de tomate, purê e arroz." },
      { name: "Parmegiana de Frango", price: 55, description: "Frango empanado, presunto, queijo, molho, purê e arroz." },
      { name: "Filé de Tilápia ao Molho de Maracujá", price: 62, description: "Tilápia, molho de maracujá, arroz e legumes." },
      { name: "Filé Mignon Grelhado", price: 65, description: "Molho madeira e arroz cremoso de parmesão." },
      { name: "Strogonoff de Filé", price: 58, description: "Filé mignon, champignon, arroz e batata palha." },
      { name: "Strogonoff de Frango", price: 48, description: "Frango cremoso, arroz branco e batata palha." },
      { name: "Arroz Caldoso de Costela", price: 57, description: "Costela desfiada, tomate cereja, manjericão e cebola crispy." },
      { name: "Moqueca de Peixe e Camarão", price: 79, description: "Tilápia, camarões, arroz branco e pirão." },
      { name: "Camarão Scampi", price: 109, description: "Camarões, vinho branco, limão e espaguete." },
      { name: "Virado à Paulista", price: 59, description: "Lombo, arroz, tutu, ovo, couve e banana frita." },
      { name: "Moqueca de Banana e Grão de Bico", price: 48, description: "Banana da terra, grão de bico e arroz branco." },
    ],
  },
  {
    id: "grelhados",
    label: "Grelhados Customizáveis",
    note: "Escolha até 3 guarnições e 1 molho de sua preferência.",
    items: [
      { name: "T-Bone Angus", price: 130, description: "" },
      { name: "Assado de Tira Angus", price: 89, description: "" },
      { name: "Baby Beef Angus", price: 89, description: "" },
      { name: "Chuleta Angus", price: 85, description: "" },
      { name: "Tornedor de Filé Mignon", price: 81, description: "" },
      { name: "Bife Ancho", price: 75, description: "" },
      { name: "Contrafilé", price: 75, description: "" },
      { name: "Carne de Sol", price: 69, description: "" },
      { name: "Picanha", price: 89, description: "" },
      { name: "Lombo Suíno", price: 69, description: "" },
      { name: "Peito de Frango", price: 49, description: "" },
      { name: "Veggie Steak", price: 38, description: "" },
      { name: "Filé de Tilápia", price: 69, description: "" },
    ],
  },
  {
    id: "petiscos",
    label: "Petiscos & Porções",
    items: [
      { name: "Carne de Sol com Mandioca", price: 71, description: "Carne de sol grelhada com mandioca." },
      { name: "Fish n' Chips", price: 66, description: "Peixe empanado, batata rústica e molho tártaro." },
      { name: "Fish, Shrimp and Chips", price: 87, description: "Tilápia e camarões empanados com batata rústica." },
      { name: "Camarão Empanado", price: 80, description: "Camarões na panko e maionese de limão pepper." },
      { name: "Frango à Passarinho", price: 44, description: "Frango marinado, alho frito e limão." },
      { name: "Pão de Alho", price: 33, description: "Baguete com creme de alho, muçarela e salsa." },
      { name: "Batata Mandi", price: 48, description: "Batata rústica, queijo, páprica, cebola e bacon." },
      { name: "Calabresa Grelhada", price: 38, description: "Calabresa, pimentões, cebolas, azeite e limão." },
    ],
  },
  {
    id: "massas",
    label: "Massas Italianas",
    note: "Escolha Espaguete, Penne ou Talharim e combine com um molho artesanal.",
    items: [
      { name: "Prato de Massa Customizada", price: 48, description: "Espaguete, penne ou talharim com molho artesanal." },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas Artesanais",
    items: [
      { name: "Calabresa", price: 49, description: "Pomodoro, calabresa, cebola, orégano e muçarela." },
      { name: "Pepperoni", price: 69, description: "Pomodoro, pepperoni, cebola roxa e muçarela." },
      { name: "Portuguesa", price: 56, description: "Pomodoro, presunto, cebola, pimentão, ovo e muçarela." },
      { name: "Marguerita", price: 46, description: "Pomodoro, tomate, manjericão e muçarela." },
      { name: "Frango com Catupiry", price: 61, description: "Pomodoro, frango, muçarela e catupiry." },
      { name: "4 Queijos", price: 71, description: "Muçarela, cheddar, parmesão e gorgonzola." },
      { name: "Muçarela", price: 42, description: "Pomodoro, muçarela e orégano." },
      { name: "Gorgonzola", price: 57, description: "Gorgonzola, muçarela, rapadura e pimenta." },
      { name: "Banana (Doce)", price: 46, description: "Muçarela, açúcar e canela." },
      { name: "Prestígio (Doce)", price: 69, description: "Muçarela, chocolate meio amargo e coco." },
    ],
  },
  {
    id: "hamburgueres",
    label: "Hambúrgueres & Sanduíches",
    items: [
      { name: "Misto Quente", price: 15, description: "Pão de forma, muçarela e presunto." },
      { name: "Laguna Burguer", price: 39, description: "Blend 140g, muçarela e maionese da casa." },
      { name: "DLB Burguer", price: 49, description: "Dois blends, muçarela, bacon e maionese." },
      { name: "Philly CSK", price: 45, description: "Baguete, carnes, cebola caramelizada e muçarela." },
      { name: "Sanduíche de Filé", price: 48, description: "Filé mignon, tomate, alface, muçarela e maionese." },
      { name: "Mandi Burguer", price: 44, description: "Blend 140g, cheddar, bacon e cebola caramelizada." },
      { name: "X-Tudo", price: 48, description: "Blend, queijo, ovo, presunto, salsicha e bacon." },
      { name: "Sanduíche Filé de Frango", price: 35, description: "Frango grelhado, alface, tomate e muçarela." },
      { name: "Veggie Sandwich", price: 32, description: "Steak vegano, salada, picles e maionese vegana." },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      { name: "Tradicional Pudim de Leite Condensado", price: 19, description: "Pudim cremoso com caramelo." },
      { name: "Brownie com Sorvete", price: 30, description: "Brownie, sorvete de creme e calda de chocolate." },
      { name: "Sorvetes", price: 28, description: "Morango, creme ou chocolate." },
      { name: "Banana Flambada", price: 25, description: "Banana caramelizada, conhaque e sorvete de creme." },
    ],
  },
  {
    id: "drinks",
    label: "Drinks & Coquetéis",
    items: [
      { name: "Caipirinha", price: 25, description: "Cachaça, limão e açúcar." },
      { name: "Caipiroska", price: 29, description: "Vodka e frutas." },
      { name: "Margarita", price: 30, description: "Tequila, licor de laranja e limão." },
      { name: "Gin Tônica", price: 30, description: "Gin, limão, tônica e gelo." },
      { name: "Cuba Libre", price: 30, description: "Rum, cola e limão." },
      { name: "Mojito", price: 31, description: "Rum, limão, hortelã e água com gás." },
      { name: "Brasileirinho", price: 30, description: "Vodka, abacaxi, blue e laranja." },
      { name: "Gin Fizz", price: 30, description: "Gin, limão, açúcar e refrigerante." },
      { name: "Cozumel", price: 25, description: "Limão, cerveja, gelo e sal." },
      { name: "Irish Coffee", price: 33, description: "Whisky, café, baunilha e creme." },
      { name: "Gin Tropical", price: 35, description: "Gin, laranja e Red Bull Tropical." },
      { name: "Piña Colada", price: 31, description: "Rum, abacaxi, coco e leite condensado." },
      { name: "Campari Tônica", price: 30, description: "Campari, tônica, gelo e limão." },
      { name: "Caipifrutas", price: 33, description: "Gin, frutas e leite condensado." },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas Não Alcoólicas & Cervejas",
    items: [
      { name: "Água de Coco", price: 9, description: "" },
      { name: "Água Mineral com Gás", price: 6, description: "" },
      { name: "Água Mineral sem Gás", price: 6, description: "" },
      { name: "Água Tônica", price: 8, description: "" },
      { name: "Café Expresso", price: 5, description: "" },
      { name: "Red Bull", price: 23, description: "" },
      { name: "Refrigerante em Lata (350ml)", price: 8, description: "Coca-Cola, Schweppes, Sprite, Fanta e Guaraná." },
      { name: "Suco Natural (Copo)", price: 12, description: "Abacaxi, limão, melancia, melão ou laranja." },
      { name: "Suco Polpa (Copo)", price: 10, description: "Acerola, cajá, caju, uva, manga e mais." },
      { name: "Suco Natural ou Polpa (Jarra 750 ml)", price: 20, description: "" },
      { name: "Cerveja Heineken (600 ml)", price: 19, description: "" },
      { name: "Cerveja Stella Artois (600 ml)", price: 19, description: "" },
      { name: "Cerveja Budweiser Long Neck", price: 10, description: "" },
      { name: "Cerveja Heineken Long Neck", price: 12, description: "" },
    ],
  },
  {
    id: "menu_executivo",
    label: "Menu Executivo Companhia Aérea",
    note: "Todos os pratos acompanham uma bebida não alcoólica.",
    items: [
      { name: "Penne alla Bolognese", price: 0, description: "Penne ao ragú bolognese, manjericão e muçarela.", includesDrink: true },
      { name: "Steak ao Molho Poivre", price: 0, description: "Bife grelhado, purê e legumes.", includesDrink: true },
      { name: "Contrafilé à Brasileira", price: 0, description: "Contrafilé, arroz, farofa e batata.", includesDrink: true },
      { name: "Peito de Frango à Brasileira", price: 0, description: "Frango, arroz, farofa e batata.", includesDrink: true },
      { name: "Estrogonofe de Frango", price: 0, description: "Frango cremoso, arroz e batata palha.", includesDrink: true },
      { name: "Salada Mandi com Frango", price: 0, description: "Mix de folhas e peito de frango grelhado.", includesDrink: true },
      { name: "Tilápia ao Molho de Maracujá", price: 0, description: "Tilápia, arroz e legumes.", includesDrink: true },
      { name: "Laguna Burguer Executivo", price: 0, description: "Blend 180g, muçarela e batata.", includesDrink: true },
      { name: "Sanduíche de Contrafilé Executivo", price: 0, description: "Contrafilé, muçarela e batata.", includesDrink: true },
      { name: "Hambúrguer de Frango Executivo", price: 0, description: "Frango, salada, muçarela e batata.", includesDrink: true },
    ],
  },
];

export const GARNISHES = [
  "Arroz branco",
  "Farofa mandi",
  "Salada mandi",
  "Batata frita",
  "Purê de batata",
  "Feijão cozido",
  "Tutu de feijão",
  "Legumes salteados ao alho",
  "Cebola assada",
  "Legumes grelhados",
];

export const SAUCES = ["À campanha", "Barbecue", "Chimichurri", "Ervas & limão", "Molho Poivre", "Maracujá & manjericão"];

export const PASTA_TYPES = ["Espaguete", "Penne", "Talharim"];

export const PASTA_SAUCES = ["Bolognese", "Sugo", "Parisiense"];

export const CUSTOMIZABLE_CATEGORY_IDS = new Set(["grelhados", "massas"]);

/** Achata as categorias em uma lista única de itens com id estável (categoria-índice). */
export function getAllItems(): MenuItem[] {
  return CATEGORIES.flatMap((category) =>
    category.items.map((item, index) => ({
      ...item,
      id: `${category.id}-${index}`,
      categoryId: category.id,
    })),
  );
}

export function getCategory(id: string): MenuCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
