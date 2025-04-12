import { useState, useEffect } from "react";
import { createOrder, getOrders } from "../services/api";
import { Order, OrderCart } from "../types";
import { orderStore } from "../store/orderStore";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { clearOrder } = orderStore();

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (order: OrderCart[]) => {
    if (order.length === 0) return false;
    try {
      const json = await createOrder(order);
      alert(json.message);
      clearOrder();
      fetchOrders();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { orders, handleCreateOrder };
};
