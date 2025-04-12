import { Request, Response } from "express";
import { Order, OrderItem } from "../types";
import { orders } from "../data/orders";
import { pizzas } from "../data/pizzas";

let currentOrderId = 1;

export class OrderController {
  static getOrders = (_req: Request, res: Response) => {
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

    res.json(ordersWithPizzas);
  };

  static getOrderById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = orders.find((o) => o.id === id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  };

  static createOrder = (req: Request, res: Response) => {
    const items = req.body.items;
    const order: Order = {
      id: currentOrderId++,
      items,
    };
    orders.push(order);
    let summaryMessage = `Orden ${order.id} creada con: `;
    summaryMessage += items
      .map((item: OrderItem) => {
        const pizza = pizzas.find((p) => p.id === item.pizzaId);
        const pizzaName = pizza ? pizza.name : "Pizza desconocida";
        return `${item.quantity}x ${pizzaName}`;
      })
      .join(", ");

    res.status(201).json({
      message: summaryMessage,
    });
  };
}
