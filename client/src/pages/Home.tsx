import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Тип даних, щоб TypeScript розумів, що приходить з бази
interface Product {
  id: string;
  name: string;
  image: string;
  sizes: { price: number }[];
}

export default function Home() {
  // Тут ми зберігатимемо товари з бази
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Отримуємо реальні дані з твого сервера
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Завантаження каталогу... 🛋️</div>;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        🏠 Наш каталог меблів
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700 flex flex-col justify-between hover:scale-[1.02] transition-transform"
          >
            {/* Реальне фото з папки public/products */}
            <img 
            src={product.name.toLowerCase().includes('пуф') 
            ? '/products/pufik/puf 5v1.jpg' 
            : '/products/stil/transformer.jpg'
            } 
            alt={product.name}
            className="h-48 w-full object-cover rounded-md mb-4"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Photo'; }}
            />
            <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
            
            {/* Беремо ціну найпершого розміру */}
            <p className="text-teal-400 font-bold text-lg mb-4">
              від {product.sizes[0]?.price || 3290} грн
            </p>
            
            {/* Кнопка веде на сторінку деталей товару */}
            <Link 
              to={`/product/${product.id}`}
              className="bg-teal-500 hover:bg-teal-600 text-white text-center py-2 px-4 rounded-md transition"
            >
              Переглянути розміри
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}