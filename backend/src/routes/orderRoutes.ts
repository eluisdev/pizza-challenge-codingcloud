import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { validateOrder } from "../validators/orderValidator";
import { errorValidator } from "../middlewares/errorValidator";

const router = Router();

router.get("/", OrderController.getOrders);
router.post("/", validateOrder, errorValidator, OrderController.createOrder);
router.get("/:id", OrderController.getOrderById);

export default router;
