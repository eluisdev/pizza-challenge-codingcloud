import { Router } from "express";
import { PizzaController } from "../controllers/PizzaController";

const router = Router();

router.get("/", PizzaController.getPizzas);

export default router;
