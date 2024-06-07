import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePaginationPipe implements PipeTransform {
  transform(value: any) {
    value.page = parseInt(value.page, 10);
    value.limit = parseInt(value.limit, 10);

    if (isNaN(value.page) || isNaN(value.limit)) {
      throw new BadRequestException('page and limit must be numbers');
    }
    return value;
  }
}
