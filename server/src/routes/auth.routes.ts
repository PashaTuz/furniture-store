import { Router } from 'express';
// Імпортуємо контролери (переконайся, що вони експортуються з auth.controller.ts)
import { login, register, refresh } from '../controllers/auth.controller'; 
// Імпортуємо обидва рівні захисту: звичайний та адмінський
import { authGuard, adminGuard } from '../middleware/auth.middleware';

const router = Router();

/**
 * ==========================================
 * ПУБЛІЧНІ МАРШРУТИ (Доступні всім)
 * ==========================================
 */

// 1. Реєстрація нового акаунта
router.post('/register', register);
/**
 * @swagger
 *   /api/auth/login:
 *     post:
 *       summary: Увійти в систему
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *       responses:
 *         200:
 *           description: Успішний вхід
 *         401:
 *           description: Невірний пароль або email
 */
// 2. Вхід (отримання пари токенів)
router.post('/login', login);

// 3. Оновлення Access токена через Refresh токен
router.post('/refresh', refresh);


/**
 * ==========================================
 * ЗАХИЩЕНІ МАРШРУТИ (Потрібен Access Token)
 * ==========================================
 */

// 4. Перевірка профілю (Задача #24)
// Доступно будь-якому авторизованому користувачу
router.get('/me', authGuard, (req, res) => {
  res.json({
    message: "Ви успішно пройшли авторизацію!",
    user: req.user // Тут будуть ваші id та role з токена
  });
});

// 5. Адмін-панель (Задача #25)
// Доступно ТІЛЬКИ якщо роль у токені — 'ADMIN'
// Зверніть увагу: спочатку спрацює authGuard, а потім adminGuard
router.get('/admin-only', authGuard, adminGuard, (req, res) => {
  res.json({
    message: "Вітаємо у секретному розділі для адміністраторів!",
    adminData: req.user
  });
});

export default router;