import { Router } from 'express';
// 1. Додаємо updateProduct в список імпорту
import { 
  getProducts, 
  getProductById, 
  createProduct,
  updateProduct 
} from '../controllers/product.controller';

// 2. Імпортуємо мідлвари для захисту
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
 */
router.post('/', authGuard, adminGuard, createProduct);

/**
 * 4. ОНОВИТИ існуючий товар (Тільки для ADMIN) - ЗАДАЧА #29
 * PUT /api/products/:id
 * 
 * Також додаємо authGuard та adminGuard для безпеки.
 */
router.put('/:id', authGuard, adminGuard, updateProduct);

export default router;