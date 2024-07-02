import { DownloadLink } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';



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
  @ArrayNotEmpty({ message: 'Download links must not be empty' })
  downloadLinks: DownloadLink[];

  @IsArray({
    message: 'Tags must be an array',
  })
  @IsOptional()
  tags?: string[];
}
