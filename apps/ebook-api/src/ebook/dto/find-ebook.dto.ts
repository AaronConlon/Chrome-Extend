import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDTO } from '../../shared/dto';

export class QueryEbookDto extends PaginationDTO {
  @IsOptional()
  @IsString({ message: 'query must be a string' })
  @MaxLength(32, { message: 'query must be less than 32 characters' })
  query: string;
}
