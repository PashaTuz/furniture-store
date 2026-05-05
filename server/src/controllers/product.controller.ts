import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//задача 31
export const getProducts = async (req: Request, res: Response) => {
  try {
    // 1. Отримуємо параметри з URL (query string)
    const { category, search, minPrice, maxPrice } = req.query;

    // 2. Створюємо об'єкт фільтрації для Prisma
    const where: any = {};

    // Фільтр за категорією
    if (category) {
      where.category = String(category);
    }

    // Пошук за назвою (insensitive — ігнорує регістр: Диван = диван)
    if (search) {
      where.name = {
        contains: String(search),
        mode: 'insensitive',
      };
    }

    // Фільтрація за ціною (через вкладену модель sizes)
    if (minPrice || maxPrice) {
      where.sizes = {
        some: { // Шукаємо, чи є хоча б один розмір, що підпадає під діапазон
          price: {
            gte: minPrice ? Number(minPrice) : 0,
            lte: maxPrice ? Number(maxPrice) : 999999,
          },
        },
      };
    }

    // 3. Виконується запит із застосуванням фільтрів
    const products = await prisma.product.findMany({
      where, // Передаємо наш об'єкт фільтрів
      include: { colors: true, sizes: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(products);
  } catch (error: any) {
    console.error("❌ ПОМИЛКА ФІЛЬТРАЦІЇ:", error.message);
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
    const { name, description, category, colors, sizes } = req.body;

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
            price: Number(s.price),
            name: String(s.sizeValue) 
          })) : []
        }
      },
      include: { colors: true, sizes: true }
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
    // Спочатку перевіряємо, чи існує товар, щоб видати 404 замість 500
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ message: "Товар для оновлення не знайдено" });
    }

    const result = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
        colors: Array.isArray(colors) ? {
          deleteMany: {}, 
          create: colors.map((c: any) => ({
            colorName: String(c.colorName),
            hex: String(c.hex)
          }))
        } : undefined,
        sizes: Array.isArray(sizes) ? {
          deleteMany: {},
          create: sizes.map((s: any) => ({
            sizeValue: String(s.sizeValue),
            price: Number(s.price),
            name: String(s.sizeValue)
          }))
        } : undefined
      },
      include: { colors: true, sizes: true }
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("❌ ПОМИЛКА ПРИ ОНОВЛЕННІ:", error.message);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// 5. ВИДАЛЕННЯ ТОВАРУ (ЗАДАЧА #30)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ message: "Товар не знайдено" });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Товар успішно видалено" });
  } catch (error: any) {
    console.error("❌ ПОМИЛКА ПРИ ВИДАЛЕННІ:", error.message);
    res.status(500).json({ error: "Не вдалося видалити товар" });
  }
};