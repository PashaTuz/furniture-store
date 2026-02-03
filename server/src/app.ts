import express from "express";  // правильно працює з esModuleInterop: true
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

export const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Тестовий роут
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});
//Базовий роут
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Welcome to Furniture Store API" });
});
//Базовий error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});