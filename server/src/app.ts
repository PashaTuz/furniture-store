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
import orderRoutes from './routes/order.routes'; // <-- 1. ДОДАТИ ЦЕ

export const app = express();

/**
 * ==========================================
 * БЛОК 0: SWAGGER DOCUMENTATION
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
                url: 'http://localhost:5000/api',
            },
        ],
        // ДОДАНО ЦЕЙ БЛОК КОМПОНЕНТІВ
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
    apis: ["./src/routes/product.routes.ts", "./src/routes/order.routes.ts", "./src/routes/auth.routes.ts"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * ==========================================
 * БЛОК 1: MIDDLEWARES
 * ==========================================
 */
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * ==========================================
 * БЛОК 2: ROUTES
 * ==========================================
 */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <-- 2. ДОДАТИ ЦЕ

app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.get("/", (req, res) => res.json({ message: "Welcome to Furniture Store API v1.0" }));

/**
 * ==========================================
 * БЛОК 3: ERROR HANDLING
 * ==========================================
 */
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) return next();
  res.status(404).json({ error: "Маршрут не знайдено." });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("Критична помилка:", err.stack);
  res.status(500).json({ error: "Внутрішня помилка сервера" });
});