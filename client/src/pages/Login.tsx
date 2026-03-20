import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const Login = () => {
  // Стейт для збереження введених даних (контрольовані інпути)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Стейт для помилок (наприклад, "Невірний пароль")
  const [error, setError] = useState('');

  // 1. Ініціалізуємо хук useNavigate.
  // Це дає нам функцію navigate, яка дозволяє змінювати сторінки без перезавантаження всього сайту.
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Забороняємо стандартну поведінку форми (перезавантаження сторінки)
    
    try {
      // Робимо POST запит до API з email та паролем
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Деструктуризація: дістаємо токен та об'єкт юзера з відповіді сервера
      const { token, user } = response.data;
      
      // Зберігаємо дані в localStorage браузера, щоб сайт "пам'ятав" нас після оновлення
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(`Привіт, ${user.name}! Ти успішно увійшов.`);
      
      // 2. Використовуємо navigate('/') для миттєвого переходу на головну.
      navigate('/'); 
      
      // Оновлюємо вікно, щоб компонент Header (або інші) заново зчитали localStorage
      // і показали "Привіт, Pasha" замість кнопки "Увійти".
      window.location.reload(); 

    } catch (err) {
      // Типізація помилки для TypeScript
      const axiosError = err as AxiosError<{ error: string }>;
      
      // Виводимо текст помилки, який прийшов з сервера (якщо є)
      setError(axiosError.response?.data?.error || 'Помилка при вході');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Вхід у магазин</h2>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Умовний рендеринг: показуємо помилку тільки якщо вона є в стейті */}
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#d4a373', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Увійти
        </button>

        {/* Використовуємо Link для швидкого переходу на сторінку реєстрації */}
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Немає акаунту? <Link to="/register" style={{ color: '#d4a373', fontWeight: 'bold' }}>Створити зараз</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;