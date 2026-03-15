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

interface Color {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  sizes: Size[];
  colors: Color[];
}

export default function Product() {
// 2 - витягуємо ID товару з адресної строки(приклад , /product/123)
  const { id } = useParams();
//3 - створюю стан, де будуть зберігатись дані про товар після завантаження
  const [product, setProduct] = useState<ProductData | null>(null);
//  стан який буде підсвічувати колір який вибрав користувач
  const [selectedColor, setSelectedColor] =  useState<string | null>(null);


//4 - useEffect запустить код один раз при відкриті сторінки 
  useEffect(() => {
    //прокрутка в гору
    window.scrollTo(0, 0);

// тут роблю виклик до сервера(бакенда), щоб отримати дані з бази
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json()) // переведення відповідь від сервера в норм код для читння
      .then((data) => setProduct(data))//кидаємо  дані в наш стан "product"
      .catch((err) => console.error("помилка при завантажені:", err));
  //функція очищення 
return () => {
  setProduct(null);
  setSelectedColor(null);
};
}, [id]);

// 5 -поки дані загружаються (product тоді null), показую текст
  if (!product) return <div className = "text-center mt-10">Завантаження...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/*Вивожу назву товару та опис*/}
      <h2 className="text-3xl font-bold text-center mb-6">{product.name}</h2>
      <p className= "text-peach-900/70 text-center mb-10 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
        {product.description.replaceAll('/n', '\n')}
      </p>

      {/*блок вибора кольору */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-peach-900 mb-4 text-center">Доступні кольори та матеріали:</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {product.colors && product.colors.map((color) => (
            <div 
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`group cursor-pointer flex flex-col items-center w-24 transition-all ${
                selectedColor === color.id ? 'scale-110' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 mb-2 transition-colors ${
                selectedColor === color.id ? 'border-peach-500 shadow-lg' : 'border-transparent group-hover:border-peach-200'
              }`}>
                <img
                  src={color.imageUrl}
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] text-center leading-tight font-medium text-peach-900">
                {color.name}
              </span>
            </div> 
            ))}
        </div>
      </div>
      
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