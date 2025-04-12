import express from "express";
import cors from "cors";
import pizzaRoutes from "./routes/pizzaRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);

export default app;
