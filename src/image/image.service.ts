import { Images } from 'src/entities/Images';
import { Repository } from 'typeorm';
import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BookmarkData,
  GetHomeFeedOptions,
} from './interface/service.interface';
import { decodeBookmark } from 'src/utils/decode-bookmark';
import { generateBookmark } from 'src/utils/generate-bookmark';
import { ImageFeedDto, ImageItemDto } from './dto/image-response.dto';

@Injectable()
export class ImageService {
  private readonly BOOKMARK_SECRET = 'secret_key';
  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async getHomeFeedData(options: GetHomeFeedOptions): Promise<ImageFeedDto> {
    const { bookmark, limit } = options;

    let query = this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.user', 'user')
      .orderBy('image.createdAt', 'DESC')
      .addOrderBy('image.id', 'DESC')
      .limit(limit + 1);

    if (bookmark) {
      const bookmarkData = decodeBookmark<BookmarkData>(
        bookmark,
        this.BOOKMARK_SECRET,
      );

      query = query.where(
        '(image.created_at < :timestamp) OR (image.created_at = :timestamp AND image.id < :id)',
        {
          timestamp: bookmarkData.lastSeenTimestamp,
          id: bookmarkData.lastSeenId,
        },
      );
    }

    const images = await query.getMany();
    const hasMore = images.length > limit;
    const actualImages = hasMore ? images.slice(0, limit) : images;

    const nextBookmark =
      hasMore && actualImages.length > 0
        ? generateBookmark(
            {
              lastSeenId: actualImages[actualImages.length - 1].id,
              lastSeenTimestamp:
                actualImages[actualImages.length - 1].createdAt?.toISOString(),
            },
            this.BOOKMARK_SECRET,
          )
        : null;

    const transformedData = actualImages.map((image) =>
      this.transformImageToDto(image),
    );

    return {
      status: 'success',
      http_status: 200,
      bookmark: nextBookmark || undefined,
      data: transformedData,
    };
  }

  async serveImageFile(id: string, width: string): Promise<StreamableFile> {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!image) {
      throw new Error('Image not found');
    } else if (image.status !== 'completed') {
      throw new Error('Image is not ready yet');
    }
  }

  private calcHeight(base: number, width: number, height: number): number {
    return Math.floor(base * (height / width));
  }

  private transformImageToDto(image: Images): ImageItemDto {
    return {
      node_id: `UGluOiR${image.id}`,
      id: image.id,
      link: null,
      images: {
        '170x': {
          width: 170,
          height: this.calcHeight(170, image.width, image.height),
          url: this.generateImageUrl(image.id, '170'),
        },
        '236x': {
          width: 236,
          height: this.calcHeight(236, image.width, image.height),
          url: this.generateImageUrl(image.id, '236'),
        },
        '474x': {
          width: 474,
          height: this.calcHeight(474, image.width, image.height),
          url: this.generateImageUrl(image.id, '474'),
        },
        '564x': {
          width: 564,
          height: this.calcHeight(564, image.width, image.height),
          url: this.generateImageUrl(image.id, '564'),
        },
        '736x': {
          width: 736,
          height: this.calcHeight(736, image.width, image.height),
          url: this.generateImageUrl(image.id, '736'),
        },
        orig: {
          width: image.width,
          height: image.height,
          url: image.id.toString(),
        },
      },
      description: image.description || '',
      title: image.altText || '',
      created_at: image.createdAt?.toISOString() || '',
      author: {
        id: image.user.id,
        node_id: `VXNlcjoR${image.user.id}`,
        username: image.user.username,
        display_name: image.user.displayName || '',
        image_small_url: image.user.imageSmallUrl || '',
        image_medium_url: image.user.imageMediumUrl || '',
      },
      type: image.mimeType,
      is_video: image.mimeType.startsWith('video/'),
    };
  }

  private generateImageUrl(url: string, size: string): string {
    return `${url}?w=${size}}`;
  }
}
