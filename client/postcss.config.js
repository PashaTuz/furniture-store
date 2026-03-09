export default {
  // PostCSS — це інструмент, який трансформує CSS за допомогою JS-плагінів
  plugins: {
    // Підключаємо сам Tailwind CSS, щоб він міг обробляти твої стилі та класи
    '@tailwindcss/postcss': {},
    
    // Autoprefixer автоматично додає вендорні префікси (наприклад, -webkit-, -moz-) 
    // до CSS-властивостей. Це потрібно, щоб дизайн виглядав однаково у всіх браузерах (Chrome, Safari, Firefox)
    'autoprefixer': {},
  },
}
