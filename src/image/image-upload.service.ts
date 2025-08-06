import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/Images';
import { Users } from 'src/entities/Users';
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

  async uploadAndProcessImage(file: Express.Multer.File): Promise<Images> {}
}
