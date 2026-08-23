import { useMemo, useState, useEffect } from "react";
import type { CustomSelection, MenuItem } from "@/data/types";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuGrid } from "@/components/MenuGrid";
import { CustomizerModal } from "@/components/CustomizerModal";
import { CartPanel } from "@/components/CartPanel";
import { Footer } from "@/components/Footer";

export default function App() {
  const [categories, setCategories] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const cart = useCart();

  // Conexão poderosa com a API da Cloudflare para puxar categorias e menu do banco D1
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const [catRes, menuRes] = await Promise.all([
          fetch("/api/categorias"),
          fetch("/api/menu")
        ]);

        const catData = await catRes.json();
        const menuData = await menuRes.json();

        // Mapeia os dados do banco para o formato esperado pelo front-end
        const formattedCategories = catData.map((c: any) => ({
          id: c.id || c.slug,
          label: c.title || c.name,
          note: c.note || ""
        }));

        const formattedItems = menuData.map((p: any) => ({
          id: String(p.id),
          categoryId: p.category_id || p.categoryId,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          image: p.image || ""
        }));

        setCategories(formattedCategories);
        setAllItems(formattedItems);

        if (formattedCategories.length > 0) {
          setActiveCategory(formattedCategories[0].id);
        }
      } catch (err) {
        console.error("Erro ao sincronizar com o banco D1:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  const visibleItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.filter((item) => item.categoryId === activeCategory);
    }
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const category = categories.find((c) => c.id === item.categoryId);
      const haystack = `${item.name} ${item.description} ${category?.label ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [allItems, activeCategory, query, categories]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);
  const heading = query.trim() ? "Resultados da busca" : (activeCategoryData?.label ?? "");
  const note = query.trim() ? undefined : activeCategoryData?.note;

  function handleSelectCategory(categoryId: string) {
    setActiveCategory(categoryId);
    setQuery("");
  }

  function handleCustomizeConfirm(custom: CustomSelection) {
    if (customizerItem) cart.addItem(customizerItem, custom);
    setCustomizerItem(null);
  }

  async function handleConfirmOrder(): Promise<{ ok: boolean; message: string }> {
    if (cart.lines.length === 0) {
      return { ok: false, message: "Adicione itens ao pedido antes de confirmar." };
    }
    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.lines.map((line) => ({
            name: line.item.name,
            quantity: line.quantity,
            unitPrice: line.item.price,
            custom: line.custom,
          })),
          subtotal: cart.totals.subtotal,
          serviceCharge: cart.totals.serviceCharge,
          total: cart.totals.total,
        }),
      });

      if (!response.ok) {
        return { ok: false, message: "Não foi possível salvar o pedido. Tente novamente." };
      }

      const data = (await response.json()) as { orderId?: string; message?: string };
      cart.clear();
      return { ok: true, message: data.message || "Pedido confirmado e enviado para a cozinha." };
    } catch {
      return { ok: false, message: "Não foi possível salvar o pedido. Verifique sua conexão e tente novamente." };
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <p className="text-xl font-medium animate-pulse">Carregando o cardápio do banco de dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Header
        query={query}
        onQueryChange={setQuery}
        itemCount={cart.totals.itemCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <Hero />
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={handleSelectCategory} 
        />
        <MenuGrid
          heading={heading}
          note={note}
          items={visibleItems}
          onAdd={(item) => cart.addItem(item)}
          onCustomize={setCustomizerItem}
        />
      </main>
      <Footer />

      {customizerItem && (
        <CustomizerModal
          item={customizerItem}
          onCancel={() => setCustomizerItem(null)}
          onConfirm={handleCustomizeConfirm}
        />
      )}

      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}
      <CartPanel
        open={cartOpen}
        lines={cart.lines}
        subtotal={cart.totals.subtotal}
        serviceCharge={cart.totals.serviceCharge}
        total={cart.totals.total}
        onClose={() => setCartOpen(false)}
        onSetQuantity={cart.setQuantity}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
