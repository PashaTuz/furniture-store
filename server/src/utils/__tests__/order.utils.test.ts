import { calculateOrderTotal } from '../order.utils';

describe('calculateOrderTotal', () => {
  it('рахує суму для одного товару', () => {
    const priceLookup = new Map([['size-1', 1000]]);
    const items = [{ productId: 'p1', sizeId: 'size-1', quantity: 2 }];

    const { total, pricedItems } = calculateOrderTotal(items, priceLookup);

    expect(total).toBe(2000);
    expect(pricedItems[0].price).toBe(1000);
  });

  it('сумує кілька різних позицій', () => {
    const priceLookup = new Map([
      ['size-1', 1000],
      ['size-2', 500],
    ]);
    const items = [
      { productId: 'p1', sizeId: 'size-1', quantity: 1 },
      { productId: 'p2', sizeId: 'size-2', quantity: 3 },
    ];

    const { total } = calculateOrderTotal(items, priceLookup);

    expect(total).toBe(1000 + 500 * 3);
  });

  it('кидає помилку, якщо ціну для розміру не знайдено', () => {
    const priceLookup = new Map([['size-1', 1000]]);
    const items = [{ productId: 'p1', sizeId: 'unknown-size', quantity: 1 }];

    expect(() => calculateOrderTotal(items, priceLookup)).toThrow(
      'Ціну для розміру unknown-size не знайдено'
    );
  });

  it('кидає помилку при кількості 0 або менше', () => {
    const priceLookup = new Map([['size-1', 1000]]);
    const items = [{ productId: 'p1', sizeId: 'size-1', quantity: 0 }];

    expect(() => calculateOrderTotal(items, priceLookup)).toThrow(
      'Некоректна кількість товару: 0'
    );
  });

  it('повертає total: 0 для порожнього масиву', () => {
    const { total, pricedItems } = calculateOrderTotal([], new Map());

    expect(total).toBe(0);
    expect(pricedItems).toEqual([]);
  });
});
