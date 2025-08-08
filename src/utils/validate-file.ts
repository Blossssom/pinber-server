import path from 'path';

export const validateFile = (file: Express.Multer.File): void => {
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
    );
  }

  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/gif',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error(
      `Invalid file type: ${file.mimetype}. Allowed types are: ${allowedMimeTypes.join(', ')}`,
    );
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExt)) {
    throw new Error(
      `Invalid file extension: ${fileExt}. Allowed extensions are: ${allowedExtensions.join(', ')}`,
    );
  }
};
