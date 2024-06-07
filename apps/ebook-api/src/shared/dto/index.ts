import { IsNumberString, Max } from 'class-validator';

export class PaginationDTO {
  @IsNumberString(
    {
      no_symbols: true,
    },
    {
      message: 'page must be a number',
    }
  )
  page: number;

  @IsNumberString(
    {
      no_symbols: true,
    },
    {
      message: 'page must be a number',
    }
  )
  @Max(100, {
    message: 'limit must be less than or equal to 100',
  })
  limit: number;
}
