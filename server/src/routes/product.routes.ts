import { Router } from 'express';
// 1. Додаємо updateProduct та deleteProduct в список імпорту
import { 
  getProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct // Додано для задачі #30
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
 */
router.put('/:id', authGuard, adminGuard, updateProduct);

/**
 * 5. ВИДАЛИТИ товар (Тільки для ADMIN) - ЗАДАЧА #30
 * DELETE /api/products/:id
 * 
 * Видалення також захищене подвійним мідлваром.
 */
router.delete('/:id', authGuard, adminGuard, deleteProduct);


export default router;