import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Створення нового замовлення
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = (req as any).user.id; 

    let totalAmount = 0;
    const orderItems = [];

    // Обчислюємо суму замовлення на основі цін у БД
    for (const item of items) {
      const productSize = await prisma.productSize.findUnique({
        where: { id: item.sizeId }
      });

      if (!productSize) {
        return res.status(404).json({ error: `Розмір ${item.sizeId} не знайдено` });
      }

      totalAmount += productSize.price * item.quantity;
      
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: productSize.price 
      });
    }

    // Транзакційне створення замовлення
    const order = await prisma.order.create({
      data: {
        userId,
        total: totalAmount,
        shippingAddress, 
        items: {
          create: orderItems
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
    const userId = (req as any).user.id;

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