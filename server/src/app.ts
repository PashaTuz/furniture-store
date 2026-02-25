import express from "express";  // правильно працює з esModuleInterop: true
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';

// 1 - ініціалізація Prisma Client
// це створить звязок з бд
const prisma = new PrismaClient();

export const app = express();

// --- БЛОК 2 - MIDDLEWARES --- настройки сервера ---
// мають бути перерд маршрутами app.get --- ВСЄГДА

// Helmet дабавляє заголовки безпеки від атак
app.use(helmet({
  crossOriginResourcePolicy: false, //Дозволяє загрузити фото з сервера
}));

// CORS дозволяє фронтенду(порт 5173) брати дані з бекенду (порт 5000)
app.use(cors());

// дозволяє серверу розуміти дані у форматі JSON --- приклад при створені заказа
app.use(express.json());

// виводить в термінал логи(хто і коли заходив на сервер), полєзно для розробки
app.use(morgan("dev"));

// --- Блок 3 ROUTES (маршрути/ендпоінти) ---

// головний маршрут для отримання всіх товарів
app.get('/api/products', async (req, res) => {
  try {
    // звертаюсь до бд через Prisma
    const products = await prisma.product.findMany({
      include: {
        sizes: true, // шоб підтягнуло ціни і розміри для всіх товарів
      },
    });
    // відправка списка товарів до клієнта(фронтенду)
    res.json(products);
  } catch (error) {
    // якшо шось пішло не так --- приклад - виключена бд
    console.error("Помилка БД:", error);
    res.status(500).json({ error: "Помилка завантаження товарів" });
  }
});

// Тестовий роут
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Базовий роут
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Welcome to Furniture Store API" });
});

// роут для отримання одного конкретного товару за ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params; // витягує ID з адресу посилання

  try {
    const product = await prisma.product.findUnique({
      where: { id: id }, // шукає в базі товар з таким ID
      include: {
        sizes: true, // обов'язково додати розміри і ціни
      }
    });
    
    // якшо товар не найдено
    if (!product) {
      return res.status(404).json({ error: "Товар не знайдено" });
    }
    // віддаємо знайдений товар
    res.json(product);

  } catch (error) {
    // якшо сталася помилка -приклад- невірний формат id
    console.error("помилка при отримані товару:", error);
    res.status(500).json({ error: "Помилка при завантажені товару" });
  }
});

// --- БЛОК 4 - ОБРОБКА НЕІСНУЮЧИХ МАРШРУТІВ (404) ---
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не знайдено" });
});

// Базовий error handler
// Викликається, якщо в коді сталася непередбачувана помилка
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});