import { Max, Min } from 'class-validator';
import { TransformToInt } from '../decorators';

export class PaginationDTO {
  @TransformToInt()
  @Min(1, {
    message: 'page must be greater than or equal to 1',
  })
  page: number;

  @TransformToInt()
  @Max(30, {
    message: 'limit must be less than or equal to 30',
  })
  @Min(1, {
    message: 'limit must be greater than or equal to 1',
  })
  limit: number;
}
