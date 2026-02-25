import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//1. описю форму об'єктів(типи), шоб ТС не давав помилки
// це має зходитись з схемою прізми
interface Size {
  id: string;
  name: string;
  price: number;
  comment?: string; //знак питання це коментар який може бути пустий
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  sizes: Size[];
}

export default function Product() {
// 2 - витягуємо ID товару з адресної строки(приклад , /product/123)
  const { id } = useParams();
//3 - створюю стан, де будуть зберігатись дані про товар після завантаження
  const [product, setProduct] = useState<ProductData | null>(null);

//4 - useEffect запустить код один раз при відкриті сторінки 
  useEffect(() => {
// тут роблю виклик до сервера(бакенда), щоб отримати дані з бази
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json()) // переведення відповідь від сервера в норм код для читння
      .then((data) => setProduct(data))//кидаємо  дані в наш стан "product"
      .catch((err) => console.error("помилка при завантажені:", err));
  }, [id]);
// 5 -поки дані загружаються (product тоді null), показую текст
  if (!product) return <div className = "text-center mt-10">Завантаження...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/*Вивожу назву товару та опис*/}
      <h2 className="text-3xl font-bold text-center mb-6">{product.name}</h2>
      <p className="text-slate-500 text-center mb-8">{product.description}</p>

      {/*блок з розмірною сіткою*/}
      <div className="grid gap-4">
        {/* 6 - цикл .map перебирає всі розміри які доступні в базі і створює для кожного блоку*/}
        {product.sizes.map((size) => (
          <div 
            key={size.id}
            className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div>
              {/* вивід назви розміру приклад - 700x2000*/}
              <span className="font-medium text-lg text-slate-800">{size.name}</span>

              {/* 7 - умова: якшо коментарій існує в базі, має показати його під назвою*/}
              {size.comment && (
                <p className="text-sm text-blue-600 italic font-light">
                  {size.comment}
                </p>
              )}
            </div>

            <div className="text-right">
              {/* 8 - вивожу ціну і додаю 'грн' тектсом*/}
              <span className="text-xl font-bold text-orange-600">
                {size.price} грн
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}