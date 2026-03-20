import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // 1. Отримуємо дані користувача, які ми зберегли в Login.tsx
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 2. Функція для виходу з акаунта
  const handleLogout = () => {
    localStorage.removeItem('token'); // Видаляємо ключ доступу
    localStorage.removeItem('user');  // Видаляємо дані юзера
    navigate('/login');               // Перекидаємо на вхід
    window.location.reload();         // Оновлюємо інтерфейс
  };

  // Якщо юзер не залогінений (хоча ProtectedRoute має це контролювати)
  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>Будь ласка, увійдіть в акаунт</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg border border-orange-100">
      <div className="text-center">
        {/* Аватар-заглушка */}
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          👤
        </div>
        
        <h2 className="text-3xl font-black text-orange-950">Мій профіль</h2>
        
        {/* Виводимо реальне ім'я та email */}
        <div className="mt-6 space-y-4 text-left">
          <div className="p-4 bg-orange-50 rounded-2xl">
            <p className="text-xs text-orange-900/50 uppercase font-bold tracking-widest">Ім'я</p>
            <p className="text-lg font-bold text-orange-900">{user.name}</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl">
            <p className="text-xs text-orange-900/50 uppercase font-bold tracking-widest">Email</p>
            <p className="text-lg font-bold text-orange-900">{user.email}</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl">
            <p className="text-xs text-orange-900/50 uppercase font-bold tracking-widest">Статус</p>
            <p className="text-lg font-bold text-orange-900">
                {user.role === 'ADMIN' ? '🛡️ Адміністратор' : '🛒 Покупець'}
            </p>
          </div>
        </div>

        {/* Кнопка виходу */}
        <button 
          onClick={handleLogout}
          className="mt-8 w-full py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors cursor-pointer"
        >
          Вийти з профілю
        </button>
      </div>
    </div>
  );
}