import { CUSTOMIZABLE_CATEGORY_IDS } from "@/data/menu";
import type { MenuItem } from "@/data/types";
import { MenuCard } from "./MenuCard";

interface MenuGridProps {
  heading: string;
  note?: string;
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export function MenuGrid({ heading, note, items, onAdd, onCustomize }: MenuGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">Cardápio</p>
          <h2 className="font-serif mt-1 text-3xl font-bold text-white">{heading}</h2>
        </div>
        <p className="text-sm text-slate-400">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </p>
      </div>

      {note && (
        <div className="mb-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">
          💡 {note}
        </div>
      )}

      {items.length === 0 ? (
        <p className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Não encontramos itens para esta busca. Tente outro termo.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const customizable = CUSTOMIZABLE_CATEGORY_IDS.has(item.categoryId);
            return (
              <MenuCard
                key={item.id}
                item={item}
                customizable={customizable}
                onAdd={() => (customizable ? onCustomize(item) : onAdd(item))}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
