import { Router } from 'express';
// 1. Додаємо createProduct в імпорт із контролера
import { 
  getProducts, 
  getProductById, 
  createProduct 
} from '../controllers/product.controller';

// 2. Імпортуємо твої мідлвари для захисту
import { authGuard, adminGuard } from '../middleware/auth.middleware';

const router = Router();

/**
 * 1. Отримати ВСІ товари (Публічно)
 * GET /api/products
 */
router.get('/', getProducts);

/**
 * 2. Отримати ОДИН товар за ID (Публічно)
 * GET /api/products/:id
 */
router.get('/:id', getProductById);

/**
 * 3. СТВОРИТИ новий товар (Тільки для ADMIN)
 * POST /api/products
 * 
 * Тут працює "подвійний замок":
 * - authGuard: перевіряє, чи юзер взагалі залогінений.
 * - adminGuard: перевіряє, чи є у нього права адміністратора.
 */
router.post('/', authGuard, adminGuard, createProduct);

export default router;