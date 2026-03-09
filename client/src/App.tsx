import { BrowserRouter, Routes, Route } from "react-router-dom";

// Імпортуємо компоненти інтерфейсу:
import Header from "./components/Header"; 

// Імпортуємо сторінки:
import Home from "./pages/Home";       
import Cart from "./pages/Cart";       
import Product from "./pages/Product"; 
import Profile from "./pages/Profile"; 
import Admin from "./pages/Admin";     

function App() {
  return (
    <BrowserRouter>
      {/* ЗМІНИ ТУТ:
          1. bg-peach-50: встановлюємо наш фірмовий світлий фон.
          2. text-peach-900: робимо текст глибоким коричневим (замість білого).
      */}
      <div className="min-h-screen bg-orange-100 text-orange-950 transition-colors duration-300">
        
        <Header />
        
        {/* main залишаємо прозорим, щоб він не перекривав фон сторінки.
            container mx-auto тримає контент по центру.
        */}
        <main className="container mx-auto mt-6 md:mt-10 p-4 px-2 sm:px-4">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
