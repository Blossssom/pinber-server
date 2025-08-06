import path from 'path';
import { Images } from 'src/entities/Images';

export const calcFilePath = (image: Images, width: string): string => {
  const imgStorage = process.env.IMAGE_STORAGE_PATH;

  if (!imgStorage) {
    throw new Error('IMAGE_STORAGE_PATH environment variable is not set');
  }

  if (width === 'orig') {
    return path.join(imgStorage, image.folderPath, image.baseName);
  } else {
    const parsedName = path.parse(image.baseName);
    const resizedName = ``;
  }
};
