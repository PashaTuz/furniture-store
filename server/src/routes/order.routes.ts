import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/order.controller';
import { authGuard } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /orders:
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
 *                   properties:
 *                     productId:
 *                       type: string
 *                     sizeId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *   responses:
 *     201:
 *       description: Замовлення успішно створено
 *     401:
 *       description: Необхідна авторизація
 *     500:
 *       description: Помилка на сервері
 */

/**
 * /my-orders:
 *   get:
 *     summary: Отримати список замовлень поточного користувача
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список замовлень отримано успішно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   totalAmount:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Необхідна авторизація
 */
router.post('/', authGuard, createOrder);
router.get('/my-orders', authGuard, getMyOrders);

export default router;