import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ОТРИМАННЯ ВСІХ ТОВАРІВ
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { colors: true, sizes: true },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ОТРИМАННЯ ТОВАРУ ЗА ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { colors: true, sizes: true },
    });
    if (!product) return res.status(404).json({ error: 'Товар не знайдено' });
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// СТВОРЕННЯ НОВОГО ТОВАРУ
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Використовуємо 'as any', щоб уникнути конфлікту типів ReadableStream
    const body = req.body as any;
    const { name, description, category, colors, sizes } = body;

    // Валідація обов'язкових полів
    if (!name || !category) {
      return res.status(400).json({ error: "Назва та категорія обов'язкові поля" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: String(name),
        description: description || "",
        category: String(category),
        colors: {
          // Завдяки оновленій схемі (?), ми передаємо тільки те, що реально потрібно
          create: Array.isArray(colors) ? colors.map((c: any) => ({
            colorName: String(c.colorName),
            hex: String(c.hex),
            // name та imageUrl тепер опціональні, їх можна не вказувати
          })) : []
        },
        sizes: {
          create: Array.isArray(sizes) ? sizes.map((s: any) => ({
            sizeValue: String(s.sizeValue),
            price: globalThis.Number(s.price),
            // Поле 'name' у ProductSize зазвичай дублює розмір для зручності пошуку
            name: String(s.sizeValue) 
          })) : []
        }
      },
      include: { 
        colors: true, 
        sizes: true 
      }
    });

    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error("❌ ПОМИЛКА ПРИ СТВОРЕННІ:", error.message);
    res.status(500).json({ error: error.message });
  }
};