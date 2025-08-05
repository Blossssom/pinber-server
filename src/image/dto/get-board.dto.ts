/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetImagesDto {
  @IsOptional()
  @IsString()
  source_url?: string = '/';

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @Type(() => Number)
  timestamp?: number;
}

export class OptionsDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  in_nux?: boolean = false;

  @IsOptional()
  @IsString({ each: true })
  bookmarks?: string[] = [];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit?: number = 20;
}
