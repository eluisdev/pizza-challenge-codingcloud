import express from "express";
import cors from "cors";
import pizzaRoutes from "./routes/pizzaRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pizzas", pizzaRoutes);
export default app;
