'use client';

import { useState } from 'react';
import menuDataJson from '@/data/menu.json';
import { MenuData, MenuItem, CartItem } from '@/types/menu';
import { Search, ShoppingBag, Utensils, Flame, Beer, Pizza, Sandwich, IceCream, GlassWater, Coffee, Plane, Salad, Soup, Plus, Check } from 'lucide-react';

const menuData: MenuData = menuDataJson as MenuData;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('entradas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Customization State
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [selectedGuarnicoes, setSelectedGuarnicoes] = useState<string[]>([]);
  const [selectedMolho, setSelectedMolho] = useState<string>('');
  const [selectedMassaType, setSelectedMassaType] = useState<string>('Espaguete');
  const [selectedMolhoMassa, setSelectedMolhoMassa] = useState<string>('Bolognese');

  const addToCart = (item: MenuItem, customizations?: any) => {
    const itemPrice = item.price || 0;
    const cartId = item.id + (customizations ? JSON.stringify(customizations) : '');
    
    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartId);
      if (existing) {
        return prev.map((c) =>
          c.id === cartId ? { ...c, quantity: c.quantity + 1, totalPrice: (c.quantity + 1) * itemPrice } : c
        );
      }
      return [
        ...prev,
        {
          id: cartId,
          menuItem: item,
          quantity: 1,
          customizations,
          totalPrice: itemPrice,
        },
      ];
    });
    setActiveModalItem(null);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty, totalPrice: newQty * (item.menuItem.price || 0) };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = subtotal * 0.10;
  const grandTotal = subtotal + serviceCharge;

  const handleOpenCustomizer = (item: MenuItem) => {
    setActiveModalItem(item);
    setSelectedGuarnicoes([]);
    setSelectedMolho('');
  };

  const currentCategoryData = menuData.categories.find((c) => c.id === selectedCategory);

  const filteredItems = searchQuery.trim()
    ? menuData.categories.flatMap((cat) => cat.items).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : currentCategoryData?.items || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              {menuData.restaurant_info.name}
            </h1>
            <p className="text-xs text-slate-400">Cardápio Oficial Digital • Taxa de Serviço 10% incluída no total</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar no cardápio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 text-sm text-slate-100 pl-9 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Pedido</span>
              {cart.length > 0 && (
                <span className="bg-slate-950 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      {!searchQuery && (
        <nav className="sticky top-[73px] z-30 bg-slate-900/95 border-b border-slate-800 overflow-x-auto py-3 px-4 no-scrollbar">
          <div className="max-w-6xl mx-auto flex gap-2">
            {menuData.categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Category Note Header */}
        {!searchQuery && currentCategoryData?.note && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm">
            💡 {currentCategoryData.note}
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-slate-100">{item.name}</h3>
                  {item.price && (
                    <span className="text-amber-400 font-bold whitespace-nowrap text-lg">
                      R$ {item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-slate-400 mb-4">{item.description}</p>
                )}
                {item.includes_drink && (
                  <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                    🥤 Acompanha Bebida Não Alcoólica
                  </span>
                )}
              </div>

              {item.category === 'grelhados' || item.category === 'massas' ? (
                <button
                  onClick={() => handleOpenCustomizer(item)}
                  className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Plus className="h-4 w-4" /> Customizar & Adicionar
                </button>
              ) : (
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Plus className="h-4 w-4" /> Adicionar ao Pedido
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Customizer Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-amber-400 mb-2">{activeModalItem.name}</h2>
            <p className="text-sm text-slate-400 mb-4">Monte o seu prato com as opções disponíveis do cardápio.</p>

            {/* Grelhados Customizer */}
            {activeModalItem.category === 'grelhados' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">
                    Guarnições (Escolha até 3):
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {menuData.categories.find(c => c.id === 'grelhados')?.options.guarnicoes.map((g: string) => {
                      const selected = selectedGuarnicoes.includes(g);
                      return (
                        <button
                          key={g}
                          onClick={() => {
                            if (selected) {
                              setSelectedGuarnicoes(selectedGuarnicoes.filter(i => i !== g));
                            } else if (selectedGuarnicoes.length < 3) {
                              setSelectedGuarnicoes([...selectedGuarnicoes, g]);
                            }
                          }}
                          className={`p-2.5 rounded-lg border text-xs text-left font-medium transition flex items-center justify-between ${
                            selected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {g} {selected && <Check className="h-4 w-4 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">
                    Molho (Escolha 1):
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {menuData.categories.find(c => c.id === 'grelhados')?.options.molhos.map((m: string) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMolho(m)}
                        className={`p-2.5 rounded-lg border text-xs text-left font-medium transition flex items-center justify-between ${
                          selectedMolho === m
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {m} {selectedMolho === m && <Check className="h-4 w-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Massas Customizer */}
            {activeModalItem.category === 'massas' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Tipo de Massa:</h4>
                  <div className="flex gap-2">
                    {['Espaguete', 'Penne', 'Talharim'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMassaType(m)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                          selectedMassaType === m
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Molho:</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Bolognese', desc: 'Molho de carne italiano com tomates frescos' },
                      { name: 'Sugo', desc: 'Tomates frescos, ervas aromáticas e alho' },
                      { name: 'Parisiense', desc: 'Cogumelos, frango, ervilhas e presunto ao bechamel' }
                    ].map((molho) => (
                      <button
                        key={molho.name}
                        onClick={() => setSelectedMolhoMassa(molho.name)}
                        className={`w-full p-3 rounded-lg border text-left transition ${
                          selectedMolhoMassa === molho.name
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-semibold">{molho.name}</div>
                        <div className="text-xs text-slate-400">{molho.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setActiveModalItem(null)}
                className="flex-1 bg-slate-800 text-slate-300 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (activeModalItem.category === 'grelhados') {
                    addToCart(activeModalItem, { guarnicoes: selectedGuarnicoes, molho: selectedMolho });
                  } else if (activeModalItem.category === 'massas') {
                    addToCart(activeModalItem, { massa: selectedMassaType, molhoMassa: selectedMolhoMassa });
                  }
                }}
                className="flex-1 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl hover:bg-amber-600 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="text-amber-400" /> Resumo do Pedido
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-slate-100 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <ShoppingBag className="h-16 w-16 mb-2 stroke-1" />
                <p>Seu carrinho está vazio.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-200">{item.menuItem.name}</h4>
                        {item.customizations?.guarnicoes && (
                          <p className="text-xs text-amber-300 mt-1">
                            Guarnições: {item.customizations.guarnicoes.join(', ')}
                          </p>
                        )}
                        {item.customizations?.molho && (
                          <p className="text-xs text-amber-300">
                            Molho: {item.customizations.molho}
                          </p>
                        )}
                        {item.customizations?.massa && (
                          <p className="text-xs text-amber-300 mt-1">
                            Massa: {item.customizations.massa} | Molho: {item.customizations.molhoMassa}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          R$ {(item.menuItem.price || 0).toFixed(2)} cada
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-amber-400">
                          R$ {item.totalPrice.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-300 font-bold hover:text-amber-400"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-300 font-bold hover:text-amber-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Taxa de Serviço (10%):</span>
                    <span>R$ {serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-amber-400 border-t border-slate-800 pt-2">
                    <span>Total Final:</span>
                    <span>R$ {grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => alert('Pedido enviado com sucesso para a recepção/cozinha!')}
                    className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
