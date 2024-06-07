import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDTO } from '../../shared/dto';

export class QueryEbookDto extends PaginationDTO {
  @IsOptional()
  @IsString({ message: 'query must be a string' })
  @MaxLength(32, { message: 'query must be less than 32 characters' })
  query: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'orderType must be asc or desc' })
  orderType: 'asc' | 'desc';

  @IsOptional()
  @IsIn(['title', 'author', 'createdAt', 'updatedAt'], {
    message: 'orderBy must be title, author or createdAt',
  })
  orderBy: 'title' | 'author' | 'createdAt' | 'updatedAt';
}
