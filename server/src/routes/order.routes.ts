import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/order.controller';
import { authGuard } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Створити нове замовлення
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 example: "м. Київ, вул. Хрещатик, 1"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - sizeId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *                     sizeId:
 *                       type: string
 *                       example: "65f2a2b3c4d5e6f7a8b9c0d2"
 *                     quantity:
 *                       type: number
 *                       example: 1
 *     responses:
 *       201:
 *         description: Замовлення успішно створено
 *       401:
 *         description: Необхідна авторизація
 *       500:
 *         description: Помилка на сервері
 */
router.post('/', authGuard, createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 * get:
 *   summary: Отримати список замовлень поточного користувача
 *    tags:
 *      - Orders
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Список замовлень отримано успішно
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  totalAmount:
 *                    type: number
 *                  status:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *      401:
 *        description: Необхідна авторизація
 */
router.get('/my-orders', authGuard, getMyOrders);

export default router;