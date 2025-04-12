import { Request, Response } from "express";
import { pizzas } from "../data/pizzas";

export class PizzaController {
  static getPizzas = (_req: Request, res: Response) => {
    res.json(pizzas);
  };
}
