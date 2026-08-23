import { Plus, SlidersHorizontal } from "lucide-react";
import type { MenuItem } from "@/data/types";
import { formatMoney } from "@/lib/format";

interface MenuCardProps {
  item: MenuItem;
  customizable: boolean;
  onAdd: () => void;
}

export function MenuCard({ item, customizable, onAdd }: MenuCardProps) {
  return (
    <article className="animate-rise flex min-h-56 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-amber-400/50">
      <div>
        <div className="flex gap-4">
          <h3 className="flex-1 text-lg font-bold text-white">{item.name}</h3>
          <strong className="whitespace-nowrap text-lg text-amber-300">
            {item.price ? formatMoney(item.price) : "Consulte"}
          </strong>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {item.description || "Preparado com o cuidado da nossa cozinha."}
        </p>
        {item.includesDrink && (
          <span className="mt-3 inline-block w-fit rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
            Inclui bebida não alcoólica
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 font-semibold text-slate-100 transition hover:bg-amber-400 hover:text-slate-950"
      >
        {customizable ? <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        <span>{customizable ? "Personalizar" : "Adicionar"}</span>
      </button>
    </article>
  );
}
