export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
}

export interface OrderItem {
  pizzaId: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
}
