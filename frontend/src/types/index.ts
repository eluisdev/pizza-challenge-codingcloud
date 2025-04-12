export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
}
export interface OrderItem {
  pizzaId: number;
  quantity: number;
  pizza: Pizza;
}

export type OrderCart = Omit<OrderItem, 'pizza'>
export interface Order {
  id: number;
  items: OrderItem[];
}
