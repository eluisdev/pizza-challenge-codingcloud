import { Pizza } from "../types";
import pizzasJson from "./example-pizzas.json";

export const pizzas: Pizza[] = pizzasJson.map((pizza, index) => ({
  id: index + 1,
  ...pizza,
}));
