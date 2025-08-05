import { Images } from 'src/entities/Images';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetHomeFeedOptions } from './interface/service.interface';

@Injectable()
export class ImageService {
  private readonly BOOKMARK_SECRET = 'secret_key';
  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async getHomeFeedData(options: GetHomeFeedOptions) {
    const { bookmark, limit, fieldSetKey } = options;

    let query = this.imageRepository
      .createQueryBuilder('images')
      .leftJoinAndSelect('images.user', 'user')
      .orderBy('images.createdAt', 'DESC')
      .addOrderBy('images.id', 'DESC')
      .limit(limit + 1);

    if (bookmark) {
      // const bookmarkData =
    }
  }
}
