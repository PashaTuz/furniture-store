export default function Home() {
  // Уявимо, що це твої товари (потім вони будуть приходити з бази даних)
  const products = [
    { id: 1, name: "Диван 'Затишок'", price: "15 000 грн" },
    { id: 2, name: "Крісло 'Скандинавія'", price: "5 200 грн" },
    { id: 3, name: "Стіл дубовий", price: "8 900 грн" },
    { id: 4, name: "Ліжко 'Хмара'", price: "21 000 грн" },
  ];

  return (
    <div>
      {/* Заголовок: text-2xl на мобілках, text-3xl на комп'ютерах */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        🏠 Головна сторінка каталогу
      </h2>

      {/* СІТКА ТОВАРІВ:
          grid: вмикає режим сітки.
          grid-cols-1: 1 колонка на мобільних телефонах.
          sm:grid-cols-2: 2 колонки на маленьких планшетах.
          lg:grid-cols-3: 3 колонки на великих екранах.
          xl:grid-cols-4: 4 колонки на широких моніторах.
          gap-6: однакова відстань між картками.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700 flex flex-col justify-between"
          >
            {/* Місце для фото товару */}
            <div className="h-48 bg-slate-700 rounded-md mb-4 flex items-center justify-center text-slate-500">
              Фото меблів
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-teal-400 font-bold text-lg mb-4">{product.price}</p>
            
            {/* Кнопка на всю ширину для зручності на телефоні */}
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition">
              До кошика
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}