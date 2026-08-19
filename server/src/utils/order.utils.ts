/**
 * Розраховує загальну суму замовлення на основі позицій та їхніх цін.
 * Винесено в окрему функцію, щоб її можна було тестувати незалежно від Express/Prisma.
 */
export interface OrderItemInput {
  productId: string;
  sizeId: string;
  quantity: number;
}

export interface PricedOrderItem extends OrderItemInput {
  price: number;
}

export function calculateOrderTotal(
  items: OrderItemInput[],
  priceLookup: Map<string, number>
): { total: number; pricedItems: PricedOrderItem[] } {
  let total = 0;
  const pricedItems: PricedOrderItem[] = [];

  for (const item of items) {
    const price = priceLookup.get(item.sizeId);

    if (price === undefined) {
      throw new Error(`Ціну для розміру ${item.sizeId} не знайдено`);
    }

    if (item.quantity <= 0) {
      throw new Error(`Некоректна кількість товару: ${item.quantity}`);
    }

    total += price * item.quantity;
    pricedItems.push({ ...item, price });
  }

  return { total, pricedItems };
}
