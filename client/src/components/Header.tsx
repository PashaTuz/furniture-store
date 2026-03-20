import { useState} from "react"; 
import { Link, useNavigate } from "react-router-dom"; 

export default function Header() {
  // Керує відкриттям/закриттям бокової панелі (бургер-меню)
  const [isOpen, setIsOpen] = useState(false);
  
  // Хук для перенаправлення користувача між сторінками
  const navigate = useNavigate();

  // 1. АВТОРИЗАЦІЯ: Дістаємо дані про користувача з пам'яті браузера.
  // localStorage.getItem повертає рядок, тому ми перетворюємо його назад в об'єкт через JSON.parse.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 2. ЛОГІКА ВИХОДУ: Очищаємо всі сліди користувача.
  const handleLogout = () => {
    localStorage.removeItem('token'); // Видаляємо ключ доступу
    localStorage.removeItem('user');  // Видаляємо дані профілю
    setIsOpen(false);                 // Закриваємо мобільне меню
    navigate('/login');               // Перекидаємо на сторінку входу
    window.location.reload();         // Жорстке оновлення сторінки, щоб скинути всі стани (стейт)
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-peach-200 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* ЛОГОТИП: При натисканні на іконку відкривається бокове меню */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-3xl font-black text-peach-900 flex items-center gap-2 hover:opacity-80 transition-all active:scale-95 cursor-pointer"
          >
            <span className="text-3xl">🛋️</span> 
            <span className="hidden sm:inline">Furniture<span className ="text-peach-500">Store</span></span>
          </button>

          {/* ДЕСКТОПНЕ МЕНЮ (видиме від 768px і більше) */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-peach-900/80">
            <Link to="/" className="hover:text-peach-500 transition-colors">Каталог</Link>
            <Link to="/cart" className="hover:text-peach-500 transition-colors">Кошик</Link>
            
            {/* УМОВНИЙ РЕНДЕРИНГ: 
                Якщо user існує — показуємо ім'я.
                Якщо user === null — показуємо кнопку входу. */}
            {user ? (
              <Link to="/profile" className="hover:text-peach-500 transition-colors text-peach-600">
                Привіт, {user.name}!
              </Link>
            ) : (
              <Link to="/login" className="hover:text-peach-500 transition-colors">Увійти</Link>
            )}

            <Link to="/admin" className="text-red-600/70 hover:text-red-600 transition-colors">Адміністратор</Link>
          </nav>

          {/* КНОПКА КОШИКА (завжди видима) */}
          <Link to="/cart" className="bg-peach-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-peach-600 transition-all active:scale-95 text-sm">
            Кошик
          </Link>
        </div>
      </header>

      {/* --- МОБІЛЬНЕ МЕНЮ (SIDEBAR) --- */}
      {/* Тінь (Backdrop), яка закриває сайт при відкритому меню */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Сама виїзна панель. Рухається по осі X (translate-x) */}
      <div className={`
        fixed top-0 left-0 h-full w-72 sm:w-80 bg-peach-50 z-[70] shadow-2xl p-6
        transition-transform duration-300 ease-in-out transform border-r border-peach-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* Кнопка-хрестик для закриття */}
        <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-2xl text-peach-900 hover:rotate-90 transition-transform cursor-pointer">✕</button>

        <div className="mt-8 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-3xl">🛋️</span>
            <span className="text-xl font-black text-peach-900 uppercase tracking-tighter">Навігація</span> 
          </div>

          <nav className="flex flex-col gap-5 text-xl font-bold text-peach-900">
            {/* onClick={() => setIsOpen(false)} потрібен, щоб меню ховалося після переходу на іншу сторінку */}
            <Link onClick={() => setIsOpen(false)} to="/" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">🏠 Головна</Link>
            <Link onClick={() => setIsOpen(false)} to="/cart" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">🛒 Мій кошик</Link>
            
            {/* МОБІЛЬНА ЛОГІКА АВТОРИЗАЦІЇ */}
            {user ? (
              <>
                <Link onClick={() => setIsOpen(false)} to="/profile" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">👤 {user.name}</Link>
                {/* Кнопка виходу доступна тільки залогіненим */}
                <button onClick={handleLogout} className="text-left hover:translate-x-2 transition-transform text-gray-500 flex items-center gap-3 cursor-pointer">🚪 Вийти</button>
              </>
            ) : (
              <Link onClick={() => setIsOpen(false)} to="/login" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">🔑 Увійти</Link>
            )}

            <div className="h-px bg-peach-200 my-2"></div>
            <Link onClick={() => setIsOpen(false)} to="/admin" className="hover:translate-x-2 transition-transform text-red-600 flex items-center gap-3">⚙️ Панель адміна</Link>
          </nav>

          {/* Нижня частина меню з контактами */}
          <div className="mt-auto bg-peach-100 p-5 rounded-3xl border border-peach-200 mb-6">
            <p className="text-xs text-peach-900/60 uppercase font-bold tracking-widest mb-2">Контакти</p>
            <p className="font-black text-peach-900">+380 99 000 00 00</p>
          </div>
        </div>
      </div>
    </>
  );
}