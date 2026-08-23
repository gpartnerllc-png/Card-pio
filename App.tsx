import { useMemo, useState } from "react";
import { CATEGORIES, getAllItems, getCategory } from "@/data/menu";
import type { CustomSelection, MenuItem } from "@/data/types";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuGrid } from "@/components/MenuGrid";
import { CustomizerModal } from "@/components/CustomizerModal";
import { CartPanel } from "@/components/CartPanel";
import { Footer } from "@/components/Footer";

const ALL_ITEMS = getAllItems();

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const cart = useCart();

  const visibleItems = useMemo(() => {
    if (!query.trim()) {
      return ALL_ITEMS.filter((item) => item.categoryId === activeCategory);
    }
    const q = query.trim().toLowerCase();
    return ALL_ITEMS.filter((item) => {
      const category = getCategory(item.categoryId);
      const haystack = `${item.name} ${item.description} ${category?.label ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, query]);

  const activeCategoryData = getCategory(activeCategory);
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
      const response = await fetch("/api/orders", {
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

      const data = (await response.json()) as { orderId: string };
      cart.clear();
      return { ok: true, message: `Pedido ${data.orderId} confirmado e enviado para a cozinha.` };
    } catch {
      return { ok: false, message: "Não foi possível salvar o pedido. Verifique sua conexão e tente novamente." };
    }
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
        <CategoryTabs activeCategory={activeCategory} onSelect={handleSelectCategory} />
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
