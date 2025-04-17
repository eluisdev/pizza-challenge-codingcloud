import request from "supertest";
import express from "express";
import orderRoutes from "../../../src/routes/orderRoutes";
import { OrderController } from "../../../src/controllers/OrderController";
import { orders } from "../../../src/data/orders";
import { pizzas } from "../../../src/data/pizzas";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(orderRoutes);

jest.mock("../../../src/controllers/OrderController");

jest.mock("../../../src/validators/orderValidator", () => ({
  validateOrder: (req: Request, res: Response, next: Function) => next(),
}));
jest.mock("../../../src/middlewares/errorValidator", () => ({
  errorValidator: (req: Request, res: Response, next: Function) => next(),
}));

describe("Order Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET / - Get all orders", () => {
    it("must return status 200 and an array of orders with pizza details", async () => {
      const ordersWithPizzas = orders.map((order) => ({
        ...order,
        items: order.items.map((item) => {
          const pizza = pizzas.find((p) => p.id === item.pizzaId) || null;
          return {
            ...item,
            pizza: pizza,
          };
        }),
      }));

      (OrderController.getOrders as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          res.json(ordersWithPizzas);
        }
      );

      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(ordersWithPizzas);
      expect(OrderController.getOrders).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /:id - Get order by ID", () => {
    it("must return status 200 and the order when found", async () => {
      const testOrder = {
        id: 1,
        items: [
          { pizzaId: 1, quantity: 2 },
          { pizzaId: 2, quantity: 1 },
        ],
      };

      (OrderController.getOrderById as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          res.json(testOrder);
        }
      );

      const response = await request(app).get(`/${testOrder.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(testOrder);
      expect(OrderController.getOrderById).toHaveBeenCalledTimes(1);
    });

    it("must return status 404 when order not found", async () => {
      (OrderController.getOrderById as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          res.status(404).json({ message: "Order not found" });
        }
      );
      const response = await request(app).get("/999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Order not found" });
      expect(OrderController.getOrderById).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST / - Create new order", () => {
    it("must return status 201 and a success message when order is created", async () => {
      const newOrderData = {
        items: [
          { pizzaId: 1, quantity: 2 },
          { pizzaId: 3, quantity: 1 },
        ],
      };
      const successMessage = {
        message: "Orden 1 creada con: 2x Margarita, 1x Napolitana",
      };
      (OrderController.createOrder as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          res.status(201).json(successMessage);
        }
      );
      const response = await request(app).post("/").send(newOrderData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(successMessage);
      expect(OrderController.createOrder).toHaveBeenCalledTimes(1);
    });

    it("should handle validation errors through middleware", async () => {
      const invalidOrderData = {
        items: [],
      };

      (OrderController.createOrder as jest.Mock).mockImplementation(
        (req: Request, res: Response) => {
          res.status(400).json({
            errors: [
              {
                type: "field",
                value: [],
                msg: "You must send at least one item",
                path: "items",
                location: "body",
              },
            ],
          });
        }
      );
      const response = await request(app).post("/").send(invalidOrderData);
      expect(response.status).toBe(400);
    });
  });
});
