import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodIssue } from 'zod';

/**
 * MIDDLEWARE: validate
 * Універсальний middleware для валідації req.body за Zod-схемою.
 * У разі помилки повертає 400 з переліком проблемних полів.
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err: ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        error: "Помилка валідації даних",
        details: errors,
      });
    }

    // Записуємо провалідовані дані назад у req.body
    req.body = result.data;
    next();
  };
};