import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  // Стейт для зберігання даних форми
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Стейт для виводу повідомлень про помилки (наприклад, "Email вже зайнятий")
  const [error, setError] = useState('');
  
  // Хук для програмного переходу між сторінками
  const navigate = useNavigate();

  // Функція, яка спрацьовує при натисканні на кнопку "Зареєструватися"
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки браузером
    
    try {
      // Відправляємо POST-запит на бекенд з об'єктом даних нового користувача
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });

      // Якщо бекенд повернув 201 (успішно), показуємо повідомлення
      alert('Реєстрація успішна! Тепер увійдіть у свій акаунт.');
      
      // Перенаправляємо користувача на сторінку логіну
      navigate('/login'); 
      
    } catch (err) {
      // Обробка помилок: приводимо тип до AxiosError, щоб прочитати відповідь сервера
      const axiosError = err as AxiosError<{ error: string }>;
      
      // Виводимо або конкретну помилку від сервера, або загальну фразу
      setError(axiosError.response?.data?.error || 'Помилка при реєстрації');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Створити акаунт</h2>
      
      <form onSubmit={handleRegister}>
        {/* Поле для імені */}
        <input 
          type="text" placeholder="Ваше ім'я" value={name} 
          onChange={(e) => setName(e.target.value)} required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        
        {/* Поле для пошти */}
        <input 
          type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        
        {/* Поле для пароля */}
        <input 
          type="password" placeholder="Пароль" value={password} 
          onChange={(e) => setPassword(e.target.value)} required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />

        {/* Якщо в стейті error є текст — виводимо його червоним кольором */}
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#d4a373', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Зареєструватися
        </button>
      </form>

      {/* Посилання для тих, хто вже має акаунт */}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Вже маєте акаунт? <Link to="/login" style={{ color: '#d4a373' }}>Увійти</Link>
      </p>
    </div>
  );
};

export default Register;