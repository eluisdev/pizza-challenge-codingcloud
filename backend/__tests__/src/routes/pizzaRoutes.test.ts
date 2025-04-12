import request from "supertest";
import express from "express";
import pizzaRoutes from "../../../src/routes/pizzaRoutes";
import { PizzaController } from "../../../src/controllers/PizzaController";
import { pizzas } from "../../../src/data/pizzas";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(pizzaRoutes);

jest.mock("../../../src/controllers/PizzaController");

describe("GET / get all pizzas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must return status 200 and an array of pizzas", async () => {
    (PizzaController.getPizzas as jest.Mock).mockImplementation(
      (req: Request, res: Response) => {
        res.status(200).json(pizzas);
      }
    );
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pizzas);
    expect(PizzaController.getPizzas).toHaveBeenCalledTimes(1);
  });

  it("should handle errors and return status 500", async () => {
    (PizzaController.getPizzas as jest.Mock).mockImplementation(
      (req: Request, res: Response) => {
        res.status(500).json({ error: "Error getting pizzas" });
      }
    );
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Error getting pizzas" });
    expect(PizzaController.getPizzas).toHaveBeenCalledTimes(1);
  });
});
