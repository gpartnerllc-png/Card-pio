import { Search, ShoppingBag } from "lucide-react";

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  itemCount: number;
  onOpenCart: () => void;
}

export function Header({ query, onQueryChange, itemCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-400/20 bg-slate-950/90 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[.22em] text-amber-300">Hotel &amp; Restaurante</p>
          <h1 className="font-serif text-2xl font-bold text-amber-300 sm:text-3xl">
            Laguna Plaza Hotel &amp; Restaurante Mandi
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Cardápio oficial digital · Taxa de serviço de 10% no total
          </p>
        </div>

        <div className="flex w-full items-center gap-3 lg:w-auto">
          <label className="relative min-w-0 flex-1 lg:w-72" htmlFor="menu-search">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar no cardápio..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
            />
          </label>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 font-bold text-slate-950 shadow-gold transition hover:bg-amber-300"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Pedido
            {itemCount > 0 && (
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-xs font-bold text-amber-300">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
