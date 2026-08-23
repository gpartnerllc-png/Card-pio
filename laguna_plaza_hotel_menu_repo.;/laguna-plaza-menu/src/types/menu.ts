export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  description?: string;
  category: string;
  includes_drink?: boolean;
}

export interface GrelhadosOptions {
  guarnicoes_max: number;
  guarnicoes: string[];
  molhos_max: number;
  molhos: string[];
}

export interface MassasOptions {
  massa_types: string[];
  molhos: { name: string; description: string }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  note?: string;
  options?: GrelhadosOptions | MassasOptions | any;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  service_charge: string;
  payment_methods: string[];
  notice: string;
  phone_procon: string;
}

export interface MenuData {
  restaurant_info: RestaurantInfo;
  categories: MenuCategory[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: {
    guarnicoes?: string[];
    molho?: string;
    massa?: string;
    molhoMassa?: string;
    bebidaExecutiva?: string;
  };
  totalPrice: number;
}
