import { clienteAxios } from "../config/axios";
import { Pizza } from "../types";

export const getPizzas = async () => {
  const response = await clienteAxios.get<Pizza[]>("/pizzas");
  return response.data;
};
