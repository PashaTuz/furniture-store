import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

// --- ІМПОРТ МАРШРУТІВ ---
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes'; 

export const app = express();

/**
 * ==========================================
 * БЛОК 0: CONFIG & MIDDLEWARES
 * ==========================================
 */
// Вимикаємо сувору перевірку слешів (щоб /api/orders працював як /api/orders/)
app.set('strict routing', false);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * ==========================================
 * БЛОК 1: SWAGGER DOCUMENTATION
 * ==========================================
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Furniture Store API',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Переконайся, що шлях до файлів правильний. 
    // Якщо ти в папці src, використовуй "./src/routes/*.ts" або просто "./routes/*.ts"
    apis: ["./src/routes/*.ts", "./routes/*.ts"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * ==========================================
 * БЛОК 2: ROUTES (ОСНОВНІ МАРШРУТИ)
 * ==========================================
 */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Додаткові сервісні маршрути
app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.get("/", (req, res) => res.json({ message: "Welcome to Furniture Store API v1.0" }));

/**
 * ==========================================
 * БЛОК 3: ERROR HANDLING (ПІСЛЯ ВСІХ МАРШРУТІВ)
 * ==========================================
 */

// Цей блок має бути ОСТАННІМ перед обробником 500 помилки
app.use((req, res, next) => {
    // Якщо запит на документацію — пропускаємо
    if (req.path.startsWith('/api-docs')) return next();
    
    // Якщо ми тут, значить жоден маршрут вище не спрацював
    res.status(404).json({ error: `Маршрут [${req.method}] ${req.url} не знайдено.` });
});

// Глобальний обробник помилок (500)
app.use((err: any, req: any, res: any, next: any) => {
    console.error("Критична помилка:", err.stack);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
});

// Логування доступних маршрутів для перевірки
console.log("--- Перевірка завантажених роутерів ---");
app._router.stack.forEach((r: any) => {
    if (r.name === 'router') {
        console.log(`Router detected: ${r.regexp}`);
    }
});