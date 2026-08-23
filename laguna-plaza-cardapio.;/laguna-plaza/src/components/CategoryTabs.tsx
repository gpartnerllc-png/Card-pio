import { CATEGORIES } from "@/data/menu";

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <nav
      aria-label="Categorias do cardápio"
      className="sticky top-[104px] z-30 border-y border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur"
    >
      <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto">
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-current={isActive ? "true" : undefined}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-amber-400 bg-amber-400 text-slate-950"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/50"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
