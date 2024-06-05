import { DownloadLink } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEbookDto {
  @IsString({
    message: 'Title must be a string',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsString({
    message: 'Author must be a string',
  })
  @IsNotEmpty({
    message: 'Author is required',
  })
  author: string;

  @IsString({
    message: 'Description must be a string',
  })
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsString({
    message: 'Cover must be a string',
  })
  @IsNotEmpty({
    message: 'Cover is required',
  })
  cover: string;

  @IsArray({
    message: 'Download links must be an array',
  })
  @IsString({
    each: true,
    message: 'Each download link and url must be a string',
  })
  downloadLinks: DownloadLink[];

  @IsArray({
    message: 'Tags must be an array',
  })
  @IsOptional()
  tags?: string[];
}
