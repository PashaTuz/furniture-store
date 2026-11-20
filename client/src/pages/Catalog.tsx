import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import type { Product } from "../types/product";

/**
 * Сторінка /catalog.
 * Завантажує товари через спільний axios-інстанс і показує три стани:
 * loading, error та empty (порожній каталог).
 * Картку товару (ProductCard) і grid винесемо окремо в задачі #43.
 */
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Прапорець, щоб не оновлювати стан після розмонтування компонента
    let cancelled = false;

    api
      .get<Product[]>("/products")
      .then((res) => {
        if (!cancelled) setProducts(res.data);
      })
      .catch((err) => {
        console.error("Помилка завантаження каталогу:", err);
        if (!cancelled) setError("Не вдалося завантажити каталог. Спробуйте пізніше.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-peach-900 font-medium animate-pulse text-xl">
        Завантаження каталогу... 🛋️
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-medium text-lg">{error}</div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-peach-900 tracking-tight text-center md:text-left">
        Каталог меблів
      </h1>

      {products.length === 0 ? (
        <p className="text-center py-20 text-peach-900/70 text-lg">
          Поки що в каталозі немає товарів.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            // Мінімальна ціна серед усіх розмірів (якщо розмірів немає — ціну не показуємо)
            const prices = product.sizes.map((s) => s.price);
            const minPrice = prices.length > 0 ? Math.min(...prices) : null;
            const image = product.colors.find((c) => c.imageUrl)?.imageUrl;

            return (
              <li
                key={product.id}
                className="bg-white p-5 rounded-[2rem] shadow-sm border border-peach-100 flex flex-col justify-between"
              >
                <div>
                  {image && (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-56 w-full object-cover rounded-2xl mb-4"
                    />
                  )}
                  <h2 className="text-xl font-bold mb-2 text-peach-900">{product.name}</h2>
                  {minPrice !== null && (
                    <p className="text-peach-500 font-extrabold text-lg mb-6">від {minPrice} грн</p>
                  )}
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="bg-peach-200 hover:bg-peach-500 text-peach-900 hover:text-white text-center py-3 px-4 rounded-2xl font-bold transition-all duration-300 active:scale-95"
                >
                  Переглянути деталі
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
