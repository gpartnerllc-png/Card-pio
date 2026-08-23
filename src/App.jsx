import React, { useState, useEffect, useMemo } from "react";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Busca dados direto da API da Cloudflare (D1)
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, menuRes] = await Promise.all([
          fetch("/api/categorias"),
          fetch("/api/menu")
        ]);

        const catData = await catRes.json();
        const menuData = await menuRes.json();

        setCategories(catData);
        setAllItems(menuData);

        if (catData.length > 0) {
          setActiveCategory(catData[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar cardápio:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const visibleItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.filter((item) => String(item.category_id || item.categoryId) === String(activeCategory));
    }
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const haystack = `${item.name} ${item.description || ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [allItems, activeCategory, query]);

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  async function handleConfirmOrder() {
    if (cart.length === 0) return alert("Adicione itens ao carrinho!");
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: totalAmount
        })
      });
      if (res.ok) {
        alert("Pedido enviado com sucesso para a cozinha!");
        setCart([]);
        setCartOpen(false);
      } else {
        alert("Erro ao enviar pedido.");
      }
    } catch (e) {
      alert("Erro de conexão.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-amber-400">
        <p className="text-xl font-semibold animate-pulse">Carregando cardápio do Laguna Plaza...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg text-amber-400">Laguna Plaza Hotel</h1>
          <p className="text-xs text-slate-400">Restaurante & Choperia Mandi</p>
        </div>
        <button 
          onClick={() => setCartOpen(true)}
          className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          Carrinho ({totalItems})
        </button>
      </header>

      {/* Categorias */}
      <nav className="flex gap-2 overflow-x-auto px-4 py-3 bg-slate-900/40 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setQuery(""); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </nav>

      {/* Barra de Busca */}
      <div className="max-w-xl mx-auto px-4 mt-4">
        <input
          type="text"
          placeholder="O que você deseja saborear hoje?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Grid de Produtos */}
      <main className="max-w-xl mx-auto px-4 mt-6 grid grid-cols-1 gap-4">
        {visibleItems.map((item) => (
          <div key={item.id} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-slate-200">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
              <p className="font-bold text-emerald-400 mt-2">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap h-fit"
            >
              + Adicionar
            </button>
          </div>
        ))}
        {visibleItems.length === 0 && (
          <p className="text-center text-slate-500 mt-10">Nenhum item encontrado.</p>
        )}
      </main>

      {/* Drawer do Carrinho */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full p-6 flex flex-col justify-between border-l border-slate-800">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className="font-bold text-lg text-amber-400">Seu Pedido</h2>
                <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.map((i) => (
                  <div key={i.id} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                    <div>
                      <p className="font-medium text-slate-200">{i.name}</p>
                      <p className="text-xs text-slate-400">Qtd: {i.quantity} x R$ {i.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-emerald-400">R$ {(i.price * i.quantity).toFixed(2)}</p>
                  </div>
                ))}
                {cart.length === 0 && <p className="text-slate-500 text-center py-8">Carrinho vazio.</p>}
              </div>
            </div>
            <div>
              <div className="border-t border-slate-800 pt-4 mb-4 flex justify-between items-center font-bold text-base">
                <span>Total:</span>
                <span className="text-emerald-400">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
