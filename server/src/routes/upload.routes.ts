import { Router } from 'express';
import { uploadImage } from '../controllers/upload.controller';
import { authGuard, adminGuard } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Завантажити зображення (тільки для адміна)
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Зображення успішно завантажено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 publicId:
 *                   type: string
 *       400:
 *         description: Файл не надано або некоректний тип файлу
 *       401:
 *         description: Необхідна авторизація
 *       403:
 *         description: Доступ дозволено тільки адміністраторам
 *       500:
 *         description: Помилка на сервері
 */
router.post('/', authGuard, adminGuard, upload.single('image'), uploadImage);

export default router;