/**
 * Типи, які відповідають відповіді GET /api/products
 * (Product + include: { colors, sizes } з Prisma).
 */
export interface ProductColor {
  id: string;
  name: string | null;
  colorName: string | null;
  hex: string | null;
  imageUrl: string | null;
}

export interface ProductSize {
  id: string;
  name: string;
  sizeValue: string | null;
  price: number;
  comment: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  colors: ProductColor[];
  sizes: ProductSize[];
}
