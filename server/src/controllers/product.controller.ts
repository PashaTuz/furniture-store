import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. ОТРИМАННЯ ВСІХ ТОВАРІВ
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

// 2. ОТРИМАННЯ ТОВАРУ ЗА ID
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

// 3. СТВОРЕННЯ НОВОГО ТОВАРУ
export const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body as any;
    const { name, description, category, colors, sizes } = body;

    if (!name || !category) {
      return res.status(400).json({ error: "Назва та категорія обов'язкові поля" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: String(name),
        description: description || "",
        category: String(category),
        colors: {
          create: Array.isArray(colors) ? colors.map((c: any) => ({
            colorName: String(c.colorName),
            hex: String(c.hex),
          })) : []
        },
        sizes: {
          create: Array.isArray(sizes) ? sizes.map((s: any) => ({
            sizeValue: String(s.sizeValue),
            price: globalThis.Number(s.price),
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

// 4. ОНОВЛЕННЯ ТОВАРУ (ЗАДАЧА #29)
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, category, colors, sizes } = req.body;

  try {
    const result = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
        // Оновлюємо кольори: видаляємо старі, створюємо нові
        colors: colors ? {
          deleteMany: {}, 
          create: colors.map((c: any) => ({
            colorName: String(c.colorName),
            hex: String(c.hex)
          }))
        } : undefined,
        // Оновлюємо розміри: видаляємо старі, створюємо нові
        sizes: sizes ? {
          deleteMany: {},
          create: sizes.map((s: any) => ({
            sizeValue: String(s.sizeValue),
            price: globalThis.Number(s.price),
            name: String(s.sizeValue)
          }))
        } : undefined
      },
      include: {
        colors: true,
        sizes: true
      }
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("❌ ПОМИЛКА ПРИ ОНОВЛЕННІ:", error.message);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};