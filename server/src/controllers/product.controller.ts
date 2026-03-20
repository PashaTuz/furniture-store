import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Ініціалізуємо Prisma клієнт для роботи з базою даних
const prisma = new PrismaClient();

/**
 * ОТРИМАННЯ ВСІХ ТОВАРІВ
 * GET /api/products
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    // Використовуємо findMany для пошуку всіх записів у таблиці Product
    const products = await prisma.product.findMany({
      // include дозволяє "підтягнути" дані з пов'язаних таблиць (відносини 1-до-багатьох)
      include: {
        colors: true, // Додаємо масив доступних кольорів для кожного товару
        sizes: true,  // Додаємо масив доступних розмірів та цін
      },
      // Можна додати сортування (наприклад, спочатку нові)
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Відправляємо успішну відповідь зі списком товарів
    res.status(200).json(products);
  } catch (error) {
    console.error('Помилка при отриманні списку товарів:', error);
    res.status(500).json({ error: 'Не вдалося завантажити список товарів' });
  }
};

/**
 * ОТРИМАННЯ ОДНОГО ТОВАРУ ЗА ID
 * GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    // Витягуємо ID з параметрів запиту (URL)
    const { id } = req.params;

    // Шукаємо унікальний запис у базі
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        colors: true,
        sizes: true,
      },
    });

    // Якщо товар не знайдено — повертаємо 404
    if (!product) {
      return res.status(404).json({ error: 'Товар не знайдено' });
    }

    // Відправляємо знайдений товар
    res.status(200).json(product);
  } catch (error) {
    console.error(`Помилка при отриманні товару з ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Помилка сервера при пошуку товару' });
  }
};