import multer from 'multer';

/**
 * MIDDLEWARE: upload
 * Приймає файл у пам'ять (не на диск) — звідти одразу передаємо його в Cloudinary,
 * не зберігаючи тимчасові файли на сервері.
 */
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // максимум 5 МБ на файл
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Дозволені лише зображення формату JPEG, PNG або WebP'));
    }
    cb(null, true);
  },
});