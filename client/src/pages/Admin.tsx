import { useState } from 'react';
import api from '../api/axios';

interface PhotoInput {
  imageUrl: string;
  uploading: boolean;
}

interface SizeInput {
  sizeValue: string;
  price: string;
}

export default function Admin() {
  // --- ОСНОВНІ ПОЛЯ ТОВАРУ ---
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // --- РОЗМІРИ ТОВАРУ ---
  const [sizes, setSizes] = useState<SizeInput[]>([{ sizeValue: '', price: '' }]);

  // --- ФОТО ТОВАРУ ---
  const [photos, setPhotos] = useState<PhotoInput[]>([{ imageUrl: '', uploading: false }]);

  // --- СТАТУС ВІДПРАВКИ ФОРМИ ---
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addSize = () => {
    setSizes([...sizes, { sizeValue: '', price: '' }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof SizeInput, value: string) => {
    const updated = [...sizes];
    updated[index] = { ...updated[index], [field]: value };
    setSizes(updated);
  };

  const addPhoto = () => {
    setPhotos([...photos, { imageUrl: '', uploading: false }]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  /**
   * Завантажує фото через POST /upload, зберігає отриманий url
   */
  const handleImageUpload = async (index: number, file: File) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], uploading: true };
    setPhotos(updated);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const withImage = [...photos];
      withImage[index] = { imageUrl: response.data.url, uploading: false };
      setPhotos(withImage);
    } catch (err) {
      console.error('Помилка завантаження фото:', err);
      const withError = [...photos];
      withError[index] = { ...withError[index], uploading: false };
      setPhotos(withError);
      setErrorMessage('Не вдалося завантажити фото. Спробуйте ще раз.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // --- ВАЛІДАЦІЯ ---
    const validSizes = sizes.filter((s) => s.sizeValue.trim() && s.price.trim());
    const validPhotos = photos.filter((p) => p.imageUrl);

    // Перевіряємо, що кожен розмір відповідає формату "число x число" (напр. 700x2000)
    const sizePattern = /^\d+(\.\d+)?\s*[xх×]\s*\d+(\.\d+)?$/i;
    const invalidSize = validSizes.find((s) => !sizePattern.test(s.sizeValue.trim()));

    if (invalidSize) {
      setErrorMessage(`Розмір "${invalidSize.sizeValue}" має неправильний формат. Приклад: 700x2000`);
      return;
    }

    if (!name.trim() || !category.trim()) {
      setErrorMessage('Заповніть назву та категорію товару');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Заповніть опис товару');
      return;
    }

    if (validSizes.length === 0) {
      setErrorMessage('Додайте хоча б один розмір з ціною');
      return;
    }

    if (validPhotos.length === 0) {
      setErrorMessage('Додайте хоча б одне фото товару');
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/products', {
        name,
        description,
        category,
        sizes: validSizes.map((s) => ({ sizeValue: s.sizeValue, price: Number(s.price) })),
        colors: validPhotos.map((p) => ({ imageUrl: p.imageUrl })),
      });

      setSuccessMessage('✅ Товар успішно створено!');
      setName('');
      setDescription('');
      setCategory('');
      setSizes([{ sizeValue: '', price: '' }]);
      setPhotos([{ imageUrl: '', uploading: false }]);
    } catch (err) {
      console.error('Помилка створення товару:', err);
      setErrorMessage('Не вдалося створити товар. Перевірте дані та спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-red-400 text-center">Панель адміністратора ⚙️</h2>
      <p className="mt-2 text-slate-400 text-center">Додати новий товар у каталог</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Назва товару</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Опис</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Категорія</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Наприклад: Столи, Пуфи..."
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* --- РОЗМІРИ --- */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Розміри та ціни</label>
            <button type="button" onClick={addSize} className="text-orange-600 text-sm font-medium">
              + Додати розмір
            </button>
          </div>

          {sizes.map((size, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Розмір (напр. 700x2000)"
                value={size.sizeValue}
                onChange={(e) => updateSize(index, 'sizeValue', e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Ціна"
                value={size.price}
                onChange={(e) => updateSize(index, 'price', e.target.value)}
                className="w-28 border border-slate-300 rounded-lg px-3 py-2"
              />
              {sizes.length > 1 && (
                <button type="button" onClick={() => removeSize(index)} className="text-red-400 px-2">
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* --- ФОТО --- */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Фото товару</label>
            <button type="button" onClick={addPhoto} className="text-orange-600 text-sm font-medium">
              + Додати фото
            </button>
          </div>

          {photos.map((photo, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <label className="inline-block bg-orange-100 text-orange-900 border border-orange-300 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:bg-orange-200 transition">
                  📷 Обрати фото
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                    className="hidden"
                  />
                </label>

                {photos.length > 1 && (
                  <button type="button" onClick={() => removePhoto(index)} className="text-red-400 px-2">
                    ✕
                  </button>
                )}
              </div>

              {photo.uploading && <p className="text-sm text-slate-400 mt-1">Завантаження фото...</p>}
              {photo.imageUrl && !photo.uploading && (
                <img src={photo.imageUrl} alt="Товар" className="mt-2 w-24 h-24 object-cover rounded-lg" />
              )}
            </div>
          ))}
        </div>

        {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}
        {errorMessage && <p className="text-red-400 font-medium">{errorMessage}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-950 text-white py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {submitting ? 'Створення...' : 'Створити товар'}
        </button>
      </form>
    </div>
  );
}