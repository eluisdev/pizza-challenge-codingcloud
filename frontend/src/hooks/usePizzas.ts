import { useState, useEffect } from "react";
import { getPizzas } from "../services/api";
import { Pizza } from "../types";

export const usePizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const pizzasData = await getPizzas();
        setPizzas(pizzasData);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return { pizzas };
};
