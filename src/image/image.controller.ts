import {
  BadRequestException,
  Controller,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResponseDto } from './dto/image-response.dto';
import { parseDataParameter } from 'src/utils/parse-parameter';
import { GetImagesDto } from './dto/get-board.dto';
import { ParseDataoption } from './interface/service.interface';

@Controller('image/HomefeedResource')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('homefeed')
  async getHomeFeed(
    @Query(new ValidationPipe({ transform: true }))
    query: GetImagesDto,
  ): Promise<ImageResponseDto> {
    try {
      const parsedData = parseDataParameter<ParseDataoption>(query.data);

      const options = parsedData.options || {};
      const currentBookmark = options.bookmarks?.[0];

      const result = await this.imageService.getHomeFeedData({
        bookmark: currentBookmark,
        limit: options.limit || 20,
        staticFeed: options.staticFeed || false,
      });

      return {
        resource: {
          status: 'success',
          data: result.data,
          bookmark: result.bookmark,
          http_status: 200,
        },
      };
    } catch (error: any) {
      throw new BadRequestException({
        resouce: {
          status: 'error',
          code: 400,
          message: `Failed to fetch home feed data: ${error}`,
          http_status: 400,
        },
      });
    }
  }
}
