import { create } from "zustand";
import { Pizza } from "../types";

type OrderItem = { pizzaId: Pizza["id"]; quantity: number };

interface OrderStore {
  orders: OrderItem[];
  addOrder: (pizzaId: Pizza["id"]) => void;
  removeFromOrder: (pizzaId: Pizza["id"]) => void;
  updateQuantity: (pizzaId: Pizza["id"], newQuantity: number) => void;
  clearOrder: () => void;
}

const initialState = {
  orders: [],
};

export const orderStore = create<OrderStore>((set) => ({
  ...initialState,
  addOrder: (pizzaId) =>
    set((state) => {
      const existingItem = state.orders.find((order) => order.pizzaId === pizzaId);
      return existingItem
        ? {
            orders: state.orders.map((order) =>
              order.pizzaId === pizzaId
                ? { ...order, quantity: order.quantity + 1 }
                : order
            ),
          }
        : { orders: [...state.orders, { pizzaId, quantity: 1 }] };
    }),

  removeFromOrder: (pizzaId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.pizzaId !== pizzaId),
    })),

  updateQuantity: (pizzaId, newQuantity) =>
    set((state) => {
      if (newQuantity < 1) {
        return {
          orders: state.orders.filter((order) => order.pizzaId !== pizzaId),
        };
      }
      return {
        orders: state.orders.map((order) =>
          order.pizzaId === pizzaId ? { ...order, quantity: newQuantity } : order
        ),
      };
    }),

  clearOrder: () => set(initialState),
}));
