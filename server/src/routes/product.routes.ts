import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller';
import { authGuard, adminGuard } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Отримати всі меблі
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товарів успішно отримано
 *   post:
 *     summary: Створити новий товар (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Товар створено
 *       403:
 *         description: Немає прав доступу
 */
router.get('/', getProducts);
router.post('/', authGuard, adminGuard, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Отримати товар за ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ID товару
 *     responses:
 *       200:
 *         description: Дані товару отримано
 *       404:
 *         description: Товар не знайдено
 *   put:
 *     summary: Оновити товар (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Товар оновлено
 *       404:
 *         description: Товар не знайдено
 *   delete:
 *     summary: Видалити товар (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Товар видалено
 *       404:
 *         description: Товар не знайдено
 */
router.get('/:id', getProductById);
router.put('/:id', authGuard, adminGuard, updateProduct);
router.delete('/:id', authGuard, adminGuard, deleteProduct);

export default router;