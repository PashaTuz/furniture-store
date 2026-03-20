import { Router } from 'express';
// Імпортуємо обидві функції з контролера
import { getProducts, getProductById } from '../controllers/product.controller';

const router = Router();

/**
 * 1. Отримати ВСІ товари
 * GET http://localhost:5000/api/products
 * Використовується для головної сторінки або каталогу
 */
router.get('/', getProducts);

/**
 * 2. Отримати ОДИН конкретний товар за його ID
 * GET http://localhost:5000/api/products/:id
 * Наприклад: /api/products/clsh123...
 * Використовується для сторінки детального опису товару
 */
router.get('/:id', getProductById);

export default router;