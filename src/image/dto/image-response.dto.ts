export class ImageInfoDto {
  width: number;
  height: number;
  url: string;
}

export class EachSizeDto {
  '170x': ImageInfoDto;
  '236x': ImageInfoDto;
  '474x': ImageInfoDto;
  '564x': ImageInfoDto;
  '736x': ImageInfoDto;
  'orig': ImageInfoDto;
}

export class AuthorDto {
  id: string;
  type: string;
  node_id: string;
  username: string;
  full_name: string;
  image_small_url: string;
  image_medium_url: string;
}

export class ImageItemDto {
  id: string;
  link?: string;
  node_id: string;
  images: EachSizeDto;
  description: string;
  title: string;
  created_at: string;
  author: AuthorDto;
  type: string;
  is_video: boolean;
}

export class ImageResponseDto {
  resource: {
    status: string;
    code: number;
    data: ImageItemDto[];
    bookmark?: string;
    http_status?: number;
  };
}
