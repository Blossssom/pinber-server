export class ImageInfoDto {
  width: number;
  height: number;
  url: string;
}

export class ImageSize {
  '170x': ImageInfoDto;
  '236x': ImageInfoDto;
  '474x': ImageInfoDto;
  '564x': ImageInfoDto;
  '736x': ImageInfoDto;
  'orig': ImageInfoDto;
}

export class AuthorDto {
  id: string;
  node_id: string;
  username: string;
  display_name: string;
  image_small_url: string;
  image_medium_url: string;
}

export class ImageItemDto {
  id: string;
  link?: string | null;
  node_id: string;
  images: ImageSize;
  description: string;
  title: string;
  created_at: string;
  author: AuthorDto;
  type: string;
  is_video: boolean;
}

export class ImageFeedDto {
  status: string;
  data: ImageItemDto[];
  bookmark?: string;
  http_status?: number;
}

export class ImageResponseDto {
  resource: ImageFeedDto;
}
