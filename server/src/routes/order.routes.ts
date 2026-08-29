import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/order.controller';
import { authGuard, adminGuard } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createOrderSchema } from '../validators/order.validator';

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
router.post('/', authGuard, validate(createOrderSchema), createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Отримати список усіх замовлень (тільки для адміна)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список усіх замовлень отримано успішно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   total:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Необхідна авторизація
 *       403:
 *         description: Доступ дозволено тільки адміністраторам
 */
router.get('/', authGuard, adminGuard, getAllOrders);

/**
 * @swagger
 * /api/orders/my-orders:
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
 *                   total:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Необхідна авторизація
 */
router.get('/my-orders', authGuard, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Змінити статус замовлення (тільки для адміна)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID замовлення
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PAID, SHIPPED, DELIVERED, CANCELED]
 *                 example: "SHIPPED"
 *     responses:
 *       200:
 *         description: Статус успішно оновлено
 *       400:
 *         description: Некоректний статус
 *       401:
 *         description: Необхідна авторизація
 *       403:
 *         description: Доступ дозволено тільки адміністраторам
 *       404:
 *         description: Замовлення не знайдено
 */
router.patch('/:id/status', authGuard, adminGuard, updateOrderStatus);

export default router;