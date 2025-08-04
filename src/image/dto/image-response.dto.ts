export class ImageSizeDto {
  width: number;
  height: number;
  url: string;
}

export class EachSizeDto {
  '170x': ImageSizeDto;
  '236x': ImageSizeDto;
  '474x': ImageSizeDto;
  '564x': ImageSizeDto;
  '736x': ImageSizeDto;
  'orig': ImageSizeDto;
}
