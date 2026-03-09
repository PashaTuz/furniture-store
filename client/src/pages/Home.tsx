import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  sizes: { price: number }[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return (
    <div className="text-center py-20 text-peach-900 font-medium animate-pulse text-xl">
      Завантаження каталогу затишку... 🛋️
    </div>
  );

  return (
    <div className="pb-10">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-peach-900 tracking-tight text-center md:text-left">
        🏠 Наш каталог меблів
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-5 rounded-[2rem] shadow-sm border border-peach-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              {/* Фото товару */}
              <div className="overflow-hidden rounded-2xl mb-4 bg-peach-50">
                <img 
                  src={product.name.toLowerCase().includes('пуф') 
                    ? '/products/pufik/puf 5v1.jpg' 
                    : '/products/stil/transformer.jpg'
                  } 
                  alt={product.name}
                  className="h-56 w-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Меблі'; }}
                />
              </div>

              <h3 className="text-xl font-bold mb-2 text-peach-900">{product.name}</h3>
              
              <p className="text-peach-500 font-extrabold text-lg mb-6">
                від {product.sizes[0]?.price || 3290} грн
              </p>
            </div>
            
            <Link 
              to={`/product/${product.id}`}
              className="bg-peach-200 hover:bg-peach-500 text-peach-900 hover:text-white text-center py-3 px-4 rounded-2xl font-bold transition-all duration-300 active:scale-95"
            >
              Переглянути деталі
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}