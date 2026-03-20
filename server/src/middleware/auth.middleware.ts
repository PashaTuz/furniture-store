import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * ІНТЕРФЕЙС ДЛЯ ДЕКОДОВАНОГО ТОКЕНА
 */
interface DecodedToken {
  id: string;
  role: string;
}

/**
 * РОЗШИРЕННЯ ТИПІВ EXPRESS
 */
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

/**
 * MIDDLEWARE: authGuard (Загальна перевірка авторизації)
 */
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: "Доступ заборонено. Будь ласка, авторизуйтесь (токен відсутній)" 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_ACCESS_SECRET!
    ) as DecodedToken;

    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({ 
      error: "Сесія застаріла або токен невалідний. Увійдіть знову." 
    });
  }
};

/**
 * MIDDLEWARE: adminGuard (Перевірка прав адміністратора)
 * Використовується ТІЛЬКИ разом з authGuard.
 */
export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  // 1. Перевіряємо, чи authGuard вже записав дані юзера в req
  if (!req.user) {
    return res.status(401).json({ error: "Ви не авторизовані" });
  }

  // 2. Перевіряємо, чи роль у токені відповідає ADMIN
  // В Prisma ми зазвичай використовуємо великі літери 'ADMIN'
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      error: "Доступ заборонено. Ця дія доступна тільки для адміністраторів." 
    });
  }

  // 3. Якщо все добре — пропускаємо до адмін-контролера
  next();
};