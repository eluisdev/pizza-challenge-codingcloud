import { PizzaController } from "../../../src/controllers/PizzaController";
import { Request, Response } from "express";
import { pizzas } from "../../../src/data/pizzas";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

describe("PizzaController", () => {
  describe("getPizzas", () => {
    it("should return all pizzas from the original file", () => {
      const req = {} as Request;
      const res = mockResponse();
      PizzaController.getPizzas(req, res);
      expect(res.json).toHaveBeenCalledWith(pizzas);
    });
  });
});
