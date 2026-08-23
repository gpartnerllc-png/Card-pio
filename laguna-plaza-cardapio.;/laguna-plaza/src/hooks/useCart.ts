import { useCallback, useMemo, useState } from "react";
import type { CartLine, CustomSelection, MenuItem } from "@/data/types";

const SERVICE_RATE = 0.1;
const STORAGE_KEY = "laguna-plaza:cart";

function loadInitialCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function persist(lines: CartLine[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // sessionStorage pode estar indisponível (modo privado) — falha silenciosa
  }
}

function customKey(itemId: string, custom: CustomSelection) {
  return `${itemId}::${JSON.stringify(custom)}`;
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(loadInitialCart);

  const addItem = useCallback((item: MenuItem, custom: CustomSelection = {}) => {
    setLines((prev) => {
      const key = customKey(item.id, custom);
      const existing = prev.find((l) => l.key === key);
      const next = existing
        ? prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + 1 } : l))
        : [...prev, { key, item, custom, quantity: 1 }];
      persist(next);
      return next;
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) => {
      const next =
        quantity <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, quantity } : l));
      persist(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    persist([]);
  }, []);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0);
    const serviceCharge = subtotal * SERVICE_RATE;
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    return { subtotal, serviceCharge, total: subtotal + serviceCharge, itemCount };
  }, [lines]);

  return { lines, addItem, setQuantity, clear, totals };
}
