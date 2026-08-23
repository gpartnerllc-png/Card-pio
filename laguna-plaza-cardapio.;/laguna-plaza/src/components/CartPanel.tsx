import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/data/types";
import { formatMoney } from "@/lib/format";

interface CartPanelProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  onClose: () => void;
  onSetQuantity: (key: string, quantity: number) => void;
  onConfirm: () => Promise<{ ok: boolean; message: string }>;
}

function describeCustom(custom: CartLine["custom"]): string {
  if (custom.guarnicoes?.length) {
    return [custom.guarnicoes.join(", "), custom.molho].filter(Boolean).join(" · ");
  }
  if (custom.massa) {
    return [custom.massa, custom.molhoMassa].filter(Boolean).join(" · ");
  }
  return "";
}

export function CartPanel({
  open,
  lines,
  subtotal,
  serviceCharge,
  total,
  onClose,
  onSetQuantity,
  onConfirm,
}: CartPanelProps) {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    setStatus(null);
    const result = await onConfirm();
    setStatus(result);
    setSubmitting(false);
  }

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-700 bg-slate-950 p-6 shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Resumo do pedido"
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="font-serif text-2xl font-bold text-white">Resumo do pedido</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar pedido"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto py-5">
          {lines.length === 0 && (
            <p className="py-14 text-center text-slate-500">Seu pedido está vazio. Escolha algo especial no cardápio.</p>
          )}
          {lines.map((line) => {
            const customText = describeCustom(line.custom);
            return (
              <div key={line.key} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{line.item.name}</h3>
                    {customText && <p className="mt-1 text-xs text-amber-200">{customText}</p>}
                    <p className="mt-2 text-sm text-slate-400">
                      {line.item.price ? formatMoney(line.item.price) : "Valor sob consulta"}
                    </p>
                  </div>
                  <strong className="text-amber-300">
                    {line.item.price ? formatMoney(line.item.price * line.quantity) : "—"}
                  </strong>
                </div>
                <div className="mt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${line.item.name}`}
                    onClick={() => onSetQuantity(line.key, line.quantity - 1)}
                    className="rounded-lg bg-slate-800 px-3 py-1 font-bold hover:bg-slate-700"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-4 text-center font-bold">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${line.item.name}`}
                    onClick={() => onSetQuantity(line.key, line.quantity + 1)}
                    className="rounded-lg bg-slate-800 px-3 py-1 font-bold hover:bg-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-slate-800 pt-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de serviço (10%)</span>
                <span>{formatMoney(serviceCharge)}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-800 pt-3 text-xl font-bold text-amber-300">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>

            {status && (
              <p
                className={`mt-3 rounded-lg p-3 text-sm ${
                  status.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-red-400/10 text-red-200"
                }`}
                role="status"
              >
                {status.message}
              </p>
            )}

            <button
              type="button"
              disabled={submitting}
              onClick={handleConfirm}
              className="mt-5 w-full rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Salvando pedido…" : "Confirmar pedido"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
