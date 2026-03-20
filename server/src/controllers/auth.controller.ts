import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Допоміжна функція для генерації пари токенів
 */
const generateTokens = (user: { id: string; role: string }) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * РЕЄСТРАЦІЯ
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Перевірка, чи користувач вже існує
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Користувач з таким email вже існує" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення користувача
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ message: "Реєстрація успішна", userId: user.id });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Помилка при реєстрації" });
  }
};

/**
 * ВХІД (LOGIN)
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // Зберігаємо Refresh Token у базу для валідації наступних сесій
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    res.json({
      accessToken,
      refreshToken,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Помилка сервера при вході" });
  }
};

/**
 * ОНОВЛЕННЯ ТОКЕНА (REFRESH)
 */
export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh токен відсутній" });
    }

    // Верифікація токена
    const payload = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET!
    ) as { id: string };

    // Пошук користувача та звірка токена з базою
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Невалідний або застарілий токен" });
    }

    // Створюємо нову пару (Rotation strategy)
    const tokens = generateTokens(user);

    // Оновлюємо токен у базі
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken }
    });

    res.json(tokens);
  } catch (error) {
    console.error("Refresh Error:", error);
    res.status(403).json({ error: "Сесія закінчилася" });
  }
};