import { queryOptions } from '@tanstack/react-query';
import { ebookApi } from '.';
import { ICreateEBook, IEbookPageParams } from './type';
export const ebookPageQO = (params: IEbookPageParams) =>
  queryOptions({
    queryKey: ['ebookPage', params],
    queryFn: () => ebookApi.page(params),
  });

export const mutationOPtions = {
  create: {
    mutationFn: (formValue: ICreateEBook) => ebookApi.create(formValue),
  },
};