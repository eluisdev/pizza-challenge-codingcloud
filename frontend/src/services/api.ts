import { clienteAxios } from "../config/axios";
import { Order, Pizza, OrderCart } from "../types";

export const getPizzas = async () => {
  const response = await clienteAxios.get<Pizza[]>("/pizzas");
  return response.data;
};

export const getOrders = async () => {
  const response = await clienteAxios.get<Order[]>("/orders");
  return response.data;
};

export const getOrderById = async (id: Order["id"]) => {
  const response = await clienteAxios.get<Pizza[]>(`/pizzas/${id}`);
  return response.data;
};

export const createOrder = async (items: OrderCart[]) => {
  const response = await clienteAxios.post("/orders", { items });
  return response.data;
};
