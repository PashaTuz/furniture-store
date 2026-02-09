// Імпортуємо основні компоненти React Router:
// BrowserRouter — "серце" навігації, дозволяє змінювати URL без перезавантаження сторінки.
// Routes — контейнер, який шукає збіг поточного URL із заданими шляхами (Route).
// Route — визначає зв'язок між шляхом (path) та компонентом (element).
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Імпортуємо компоненти інтерфейсу:
import Header from "./components/Header"; // Шапка сайту, яка буде відображатися всюди.

// Імпортуємо сторінки нашого магазину:
import Home from "./pages/Home";       // Головна сторінка зі списком усіх товарів.
import Cart from "./pages/Cart";       // Сторінка кошика, куди користувач додає меблі.
import Product from "./pages/Product"; // Сторінка з детальним описом конкретного товару.
import Profile from "./pages/Profile"; // Особистий кабінет користувача.
import Admin from "./pages/Admin";     // Панель адміністратора для керування магазином.

function App() {
  return (
    // <BrowserRouter> активує навігацію для всього, що знаходиться всередині.
    <BrowserRouter>
      
      {/* Глобальний контейнер сайту:
          min-h-screen: розтягує фон мінімум на всю висоту вікна.
          bg-slate-900: темно-синій фон у стилі "Dark Mode".
          text-white: основний колір тексту — білий.
      */}
      <div className="min-h-screen bg-slate-900 text-white">
        
        {/* <Header /> стоїть поза <Routes>, тому він НЕ зникає при перемиканні сторінок. */}
        <Header />
        
        {/* <main> — основна область контенту:
            container mx-auto: обмежує ширину контенту та центрує його.
            mt-10: відступ зверху, щоб текст не "прилипав" до шапки.
            p-4: внутрішні відступи для зручного відображення на телефонах.
        */}
        <main className="container mx-auto mt-6 md:mt-10 p-4 px-2 sm:px-4">
          
          {/* <Routes> аналізує URL в адресному рядку браузера. */}
          <Routes>
            
            {/* Шлях "/" — це головна сторінка нашого каталогу. */}
            <Route path="/" element={<Home />} />
            
            {/* Шлях "/product/:id" — сторінка товару.
                ":id" — це змінна частина URL (параметр), наприклад: /product/1.
            */}
            <Route path="/product/:id" element={<Product />} />
            
            {/* Шлях "/cart" — відкриває сторінку з вибраними товарами. */}
            <Route path="/cart" element={<Cart />} />
            
            {/* Шлях "/profile" — веде до налаштувань користувача. */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Шлях "/admin" — лише для власника магазину. */}
            <Route path="/admin" element={<Admin />} />
            
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

// Експортуємо головний компонент для запуску всього додатка.
export default App;