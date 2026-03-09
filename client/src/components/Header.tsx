import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // хук useStte керує видимістю бічної плашки (true - видно, false - схованр)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       {/* --- Основна шапка --- */}
       {/* bg-white/80 + backdrop-blur-md: створює ефект напівпрозорого 'матового скла'
           sticky + top-0: шапка завжди залишається зверху при скролі
           z-50: гарант шо шапка буде над всіма карточками товарів
           */}
        <header className = "bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-peach-200 shadow-sm transition-all">
          <div className = "container mx-auto px-4 h-16 flex items-center justify-between">

            {/* кнопка лого при кліку відкривається бокове меню */}
            <button
              onClick = {() => setIsOpen(true)}
              className = "text-3xl font-black text-peach-90 fkex items-center gap-2 hover:opacity-80 transition-all active:scale-95 cursor-pointer"
            >
              <span className = "text-3xl">🛋️</span> 
              <span className = "hidden sm:inLine">Furniture<span className ="text-peach-500">Store</span></span>
            </button>

            {/* навігація для великих екранів (md:flex показує її тільки від 768px) */}
            <nav className = "hidden md:flex items-center gap-8 font-bold text-peach-900/80">
              <Link to = "/" className = "hover:text-peach-500 transition-colors">Каталог</Link>
              <Link to = "/cart" className = "hover:text-peach-500 transition-colors">Кошик</Link>
              <Link to = "/profile" className = "hover:text-peach-500 transition-colors">Профіль</Link>
              <Link to = "/admin" className = "text-red-600/70 hover:text-red-600 transition-colors">Адміністратор</Link>
            </nav>

            {/* кнопка кошика в шапці для швидкрнр переходу*/} 
            <Link to = "/cart" className = "bg-peach-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-peach-600 transition-all active:scale-95 text-sm">
              Кошик
            </Link>
          </div>
        </header>
            
        {/* --- виїздна плашка (sidebar) --- */}
            
        {/* 1. оверлей(затемнення фону) 
          з'являється тільки коли isOpen === true.
          прикліку на нього меню закривається (onClick ={() => setIsOpen(false)})
        */}
        {isOpen &&(
        <div
          className = "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity cursor-pointer"
          onClick = {() => setIsOpen(false)}
        />
        )}

        {/* 2. контента частина плашка
          ${isOpen ? "translat-x-0" : "-translate-x-full"}: головна анімація
          якшо false - плашка зміщена на 100 процентів своєї ширини
        */}
          <div className = {`
          fixed top-0 left-0 h-full w-72 sm:w-80 bg-peach-50 z-[70] shadow-2xl p-6
          transition-transform duration-300 ease-in-out transform border-r border-peach-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}>

          {/*хрестик для закриття меню */}
          <button
          onClick = {() => setIsOpen(false)}
          className = "absolute top-5 right-5 text-2xl text-peach-900 hover:rotate-90 transition-transform cursor-pointer"
            >
              ✕
          </button>

          <div className = "mt-8 flex flex-col h-full">
          {/* Загаловок в середині меню */}
          <div className = "flex items-center gap-2 mb-10">
          <span className = "text-3xl">🛋️</span>
          <span className = "text-xl font-black text-peach-900 uppercase tracking-tighter">Навігація</span> 
          </div>
          {/* Список посилань у плашці */}
            <nav className = "flex flex-col gap-5 etxt-xl fon-bold text-peach-900">
          {/* onClick={() => setIsOpen(false)} обов'язковий, щоб меню закрилося після переходу на сторінку */}
            <Link onClick={() => setIsOpen(false)} to="/" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">
              🏠 Головна
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/cart" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">
              🛒 Мій кошик
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/profile" className="hover:translate-x-2 transition-transform hover:text-peach-500 flex items-center gap-3">
              👤 Мій профіль
            </Link>
          {/* Декоративна лінія-розділювач */}
          <div className="h-px bg-peach-200 my-2"></div>
            
            <Link onClick={() => setIsOpen(false)} to="/admin" className="hover:translate-x-2 transition-transform text-red-600 flex items-center gap-3">
              ⚙️ Панель адміна
            </Link>
          </nav>

          {/* Інформаційний блок у нижній частині меню */}
          <div className="mt-auto bg-peach-100 p-5 rounded-3xl border border-peach-200 mb-6">
            <p className="text-xs text-peach-900/60 uppercase font-bold tracking-widest mb-2">Контакти</p>
            <p className="font-black text-peach-900">+380 99 000 00 00</p>
            <p className="text-sm text-peach-900/80">Працюємо з 9:00 до 20:00</p>
          </div>
        </div>
      </div>
    </>
  )
}
