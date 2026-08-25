import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateOrderTotal } from '../utils/order.utils';

const prisma = new PrismaClient();

/**
 * Створення нового замовлення
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user!.id; 

    // Отримуємо реальні ціни з БД для всіх переданих розмірів
    const sizeIds: string[] = items.map((item: { sizeId: string }) => item.sizeId);
    const productSizes = await prisma.productSize.findMany({
      where: { id: { in: sizeIds } }
    });

    const priceLookup = new Map(productSizes.map((size) => [size.id, size.price]));

    const missingSizeId = sizeIds.find((id) => !priceLookup.has(id));
    if (missingSizeId) {
      return res.status(404).json({ error: `Розмір ${missingSizeId} не знайдено` });
    }

    // Чиста функція, яку можна тестувати окремо від Express/Prisma
    const { total, pricedItems } = calculateOrderTotal(items, priceLookup);

    // Транзакційне створення замовлення
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        shippingAddress,
        items: {
          create: pricedItems
        }
      },
      include: { items: true }
    });

    res.status(201).json(order);
  } catch (error: any) {
    console.error("Помилка створення замовлення:", error);
    res.status(500).json({ error: "Не вдалося створити замовлення" });
  }
};

/**
 * Отримання всіх замовлень поточного користувача
 */
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        items: {
          include: {
            product: true // Додаємо дані про товар (назва, фото тощо)
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Нові замовлення будуть зверху
      }
    });

    res.status(200).json(orders);
  } catch (error: any) {
    console.error("Помилка при отриманні замовлень:", error);
    res.status(500).json({ error: "Не вдалося отримати список замовлень" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(orders);
  } catch (error: any) {
    console.error("Помилка при отриманні всіх замовлень:", error);
    res.status(500).json({ error: "Не вдалося отримати список замовлень" });
  }
};