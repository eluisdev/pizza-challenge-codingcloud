import { OrderController } from "../../../src/controllers/OrderController";
import { orders } from "../../../src/data/orders";
import { Request, Response } from "express";
import { pizzas } from "../../../src/data/pizzas";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

describe("OrderController", () => {
  beforeEach(() => {
    orders.length = 0;
  });

  describe("getOrders", () => {
    it("should return all orders with pizza details", () => {
      orders.push({
        id: 1,
        items: [{ pizzaId: 1, quantity: 2 }],
      });
      const req = {} as Request;
      const res = mockResponse();
      OrderController.getOrders(req, res);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          items: [
            {
              pizzaId: 1,
              quantity: 2,
              pizza: pizzas[0],
            },
          ],
        },
      ]);
    });
  });

  describe("getOrderById", () => {
    it("should return an existing order", () => {
      orders.push({
        id: 1,
        items: [],
      });

      const req = {
        params: { id: "1" },
      } as unknown as Request;

      const res = mockResponse();
      OrderController.getOrderById(req, res);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        items: [],
      });
    });

    it("should return 404 if order doesn't exist", () => {
      const req = {
        params: { id: "999" },
      } as unknown as Request;

      const res = mockResponse();
      OrderController.getOrderById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Order not found" });
    });
  });

  describe("createOrder", () => {
    it("should create a new order and return summary message", () => {
      const req = {
        body: {
          items: [{ pizzaId: 2, quantity: 3 }],
        },
      } as Request;

      const res = mockResponse();
      OrderController.createOrder(req, res);
      expect(orders.length).toBe(1);
      expect(orders[0].id).toBeDefined();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("Orden 1 creada con: 3x Bufala"),
      });
    });
  });
});
