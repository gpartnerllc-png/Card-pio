export interface MenuItem {
  id: string;
  name: string;
  price: number; // 0 = "Consulte" (ex.: menu executivo cotado à parte)
  description: string;
  categoryId: string;
  includesDrink?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  note?: string;
  items: Omit<MenuItem, "id" | "categoryId">[];
}

export interface CustomSelection {
  guarnicoes?: string[];
  molho?: string;
  massa?: string;
  molhoMassa?: string;
}

export interface CartLine {
  key: string;
  item: MenuItem;
  custom: CustomSelection;
  quantity: number;
}
