import { queryOptions } from '@tanstack/react-query';
import { ebookApi } from '.';
import { IEbookPageParams } from './type';
export const ebookPageQO = (params: IEbookPageParams) =>
  queryOptions({
    queryKey: ['ebookPage', params],
    queryFn: () => ebookApi.page(params),
  });
