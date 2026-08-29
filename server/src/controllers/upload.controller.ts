import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

/**
 * Завантаження зображення в Cloudinary (тільки для адміна)
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не надано" });
    }

    // Конвертуємо буфер файлу в base64, щоб передати напряму в Cloudinary без тимчасового файлу
    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: 'furniture-store', // окрема папка в Cloudinary для порядку
    });

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Помилка завантаження зображення:", error);
    res.status(500).json({ error: "Не вдалося завантажити зображення" });
  }
};