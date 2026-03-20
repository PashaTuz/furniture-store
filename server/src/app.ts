import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// --- ІМПОРТ МАРШРУТІВ ---
// Ми винесли логіку в окремі файли, щоб app.ts не перетворювався на "смітник"
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

export const app = express();

/**
 * ==========================================
 * БЛОК 1: MIDDLEWARES (Проміжне ПЗ)
 * Ці функції обробляють запит ДО того, як він дійде до маршрутів
 * ==========================================
 */

// Helmet додає заголовки безпеки, щоб захистити сервер від поширених вразливостей
app.use(helmet({ 
  crossOriginResourcePolicy: false // Дозволяє завантажувати фото з сервера на фронтенд
}));

// CORS дозволяє вашому фронтенду (наприклад, localhost:5173) робити запити до цього сервера
app.use(cors());

// Дозволяє серверу читати JSON-дані, які приходять у тілі запиту (req.body)
app.use(express.json());

// Morgan виводить у консоль інформацію про кожен запит (метод, шлях, статус-код)
app.use(morgan("dev"));


/**
 * ==========================================
 * БЛОК 2: ROUTES (Маршрути)
 * Визначаємо головні точки входу в API
 * ==========================================
 */

// Всі запити, що починаються з /api/auth, підуть у файл auth.routes.ts
app.use('/api/auth', authRoutes);

// Всі запити, що починаються з /api/products, підуть у файл product.routes.ts
app.use('/api/products', productRoutes);

/**
 * БАЗОВІ ПЕРЕВІРКИ
 */

// Роут для моніторингу (перевірка чи живий сервер)
app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

// Вітальне повідомлення на головній сторінці API
app.get("/", (req, res) => res.json({ message: "Welcome to Furniture Store API v1.0" }));


/**
 * ==========================================
 * БЛОК 3: ERROR HANDLING (Обробка помилок)
 * ==========================================
 */

// 1. Обробка 404 (якщо клієнт звернувся за адресою, якої не існує)
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не знайдено. Перевірте правильність URL." });
});

// 2. Глобальний обробник помилок (якщо десь у коді сталася критична помилка)
// Це "страховка", щоб сервер не впав, а надіслав коректну відповідь 500
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Критична помилка сервера:", err.stack);
  res.status(500).json({ 
    error: "Внутрішня помилка сервера",
    details: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});