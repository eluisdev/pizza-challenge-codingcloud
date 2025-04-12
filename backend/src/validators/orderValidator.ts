import { body } from "express-validator";

export const validateOrder = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("You must send at least one item"),
  body("items.*.pizzaId").isInt({ min: 1 }).withMessage("Invalid pizza ID"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Amount must be >= 1"),
];
