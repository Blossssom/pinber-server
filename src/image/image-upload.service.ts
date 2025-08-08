import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import path from 'path';
import { Images } from 'src/entities/Images';
import { Users } from 'src/entities/Users';
import { validateFile } from 'src/utils/validate-file';
import { Repository } from 'typeorm';

interface UploadMetadata {
  description?: string;
  altText?: string;
  tags?: string[];
  category?: string;
  subcategory?: string;
}

@Injectable()
export class ImageUploadService {
  private readonly IMAGE_STORAGE_PATH =
    process.env.IMAGE_STORAGE_PATH || '/default/path';
  private readonly SIZES = [170, 236, 474, 564, 736];
  /**
   * @Todo - 용량 체크 해보고 env로 설정할 수 있도록 하기
   */
  private readonly maxFileSize = 20 * 1024 * 1024; // 20 MB

  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async uploadAndProcessImage(
    file: Express.Multer.File,
    userId: string,
    metadata?: UploadMetadata,
  ): Promise<Images> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      validateFile(file);
    } catch (err) {}
  }
}
