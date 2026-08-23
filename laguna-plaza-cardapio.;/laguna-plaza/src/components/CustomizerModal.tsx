import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GARNISHES, PASTA_SAUCES, PASTA_TYPES, SAUCES } from "@/data/menu";
import type { CustomSelection, MenuItem } from "@/data/types";

interface CustomizerModalProps {
  item: MenuItem;
  onCancel: () => void;
  onConfirm: (custom: CustomSelection) => void;
}

const MAX_GARNISHES = 3;

function ChoiceButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border p-3 text-left text-sm font-semibold transition ${
        selected
          ? "border-amber-400 bg-amber-400/15 text-amber-100"
          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
      }`}
    >
      {selected ? "✓ " : ""}
      {label}
    </button>
  );
}

export function CustomizerModal({ item, onCancel, onConfirm }: CustomizerModalProps) {
  const isGrelhado = item.categoryId === "grelhados";
  const [garnishes, setGarnishes] = useState<string[]>([]);
  const [sauce, setSauce] = useState("");
  const [pasta, setPasta] = useState(PASTA_TYPES[0]);
  const [pastaSauce, setPastaSauce] = useState(PASTA_SAUCES[0]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function toggleGarnish(g: string) {
    setGarnishes((prev) => {
      if (prev.includes(g)) return prev.filter((x) => x !== g);
      if (prev.length >= MAX_GARNISHES) return prev;
      return [...prev, g];
    });
  }

  function handleConfirm() {
    onConfirm(
      isGrelhado ? { guarnicoes: garnishes, molho: sauce } : { massa: pasta, molhoMassa: pastaSauce },
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-name"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="customizer-name" className="font-serif text-2xl font-bold text-amber-300">
              {item.name}
            </h2>
            <p className="mt-2 text-sm text-slate-400">Monte seu prato com as opções disponíveis do cardápio.</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Fechar"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          {isGrelhado ? (
            <>
              <h3 className="mb-3 font-bold text-white">
                Guarnições <span className="text-sm font-normal text-slate-400">(até {MAX_GARNISHES})</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {GARNISHES.map((g) => (
                  <ChoiceButton key={g} label={g} selected={garnishes.includes(g)} onClick={() => toggleGarnish(g)} />
                ))}
              </div>

              <h3 className="mb-3 mt-6 font-bold text-white">Molho</h3>
              <div className="grid grid-cols-2 gap-2">
                {SAUCES.map((s) => (
                  <ChoiceButton key={s} label={s} selected={sauce === s} onClick={() => setSauce(s)} />
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-3 font-bold text-white">Tipo de massa</h3>
              <div className="grid grid-cols-3 gap-2">
                {PASTA_TYPES.map((p) => (
                  <ChoiceButton key={p} label={p} selected={pasta === p} onClick={() => setPasta(p)} />
                ))}
              </div>

              <h3 className="mb-3 mt-6 font-bold text-white">Molho artesanal</h3>
              <div className="grid gap-2">
                {PASTA_SAUCES.map((s) => (
                  <ChoiceButton key={s} label={s} selected={pastaSauce === s} onClick={() => setPastaSauce(s)} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl bg-slate-800 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950 hover:bg-amber-300"
          >
            Adicionar ao pedido
          </button>
        </div>
      </div>
    </div>
  );
}
