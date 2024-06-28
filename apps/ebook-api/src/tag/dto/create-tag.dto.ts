import { IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString({
    message: 'Name must be a string',
  })
  @MaxLength(8, {
    message: 'Name is too long',
  })
  name: string;
}
