import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Імпортуємо компоненти інтерфейсу:
import Header from "./components/Header"; 

// Імпортуємо сторінки:
import Home from "./pages/Home";       
import Cart from "./pages/Cart";       
import Product from "./pages/Product"; 
import Profile from "./pages/Profile"; 
import Admin from "./pages/Admin";     
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ ДОДАНО: Імпорт сторінки реєстрації

function App() {
  return (
    <BrowserRouter>
      {/* bg-orange-100: наш світлий фон для всього додатка.
          text-orange-950: темний колір тексту для кращої читабельності на світлому фоні.
      */}
      <div className="min-h-screen bg-orange-100 text-orange-950 transition-colors duration-300">
        
        <Header />
        
        <main className="container mx-auto mt-6 md:mt-10 p-4 px-2 sm:px-4">
          
          <Routes>
            {/* ВІДКРИТІ МАРШРУТИ: Доступні всім */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* ✅ ДОДАНО: Маршрут реєстрації */}
  
            {/* ЗАХИЩЕНІ РОУТИ (Тільки для Адміна)
                ProtectedRoute перевіряє localStorage на наявність користувача та роль "ADMIN"
            */}
            <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* ЗАХИЩЕНІ РОУТИ (Для будь-якого залогіненого користувача)
                Якщо токена немає — автоматично редиректить на /login
            */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;