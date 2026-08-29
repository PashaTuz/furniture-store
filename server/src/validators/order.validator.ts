import { z } from 'zod';

/**
 * Схема валідації для створення замовлення (POST /api/orders)
 */
export const createOrderSchema = z.object({
  shippingAddress: z
    .string({ error: "Адреса доставки обов'язкова" })
    .trim()
    .min(5, "Адреса доставки занадто коротка"),
  items: z
    .array(
      z.object({
        productId: z.string({ error: "productId обов'язковий" }).min(1, "productId не може бути порожнім"),
        sizeId: z.string({ error: "sizeId обов'язковий" }).min(1, "sizeId не може бути порожнім"),
        quantity: z
          .number({ error: "quantity обов'язковий" })
          .int("quantity має бути цілим числом")
          .positive("quantity має бути більше нуля"),
      })
    )
    .min(1, "Замовлення має містити хоча б один товар"),
});