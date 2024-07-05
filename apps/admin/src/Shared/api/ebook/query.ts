import { queryOptions } from '@tanstack/react-query';
import { ebookApi } from '.';
import { ICreateEBook, IEbookPageParams } from './type';
export const ebookPageQO = (params: IEbookPageParams) =>
  queryOptions({
    queryKey: ['ebookPage', params],
    queryFn: () => ebookApi.page(params),
    meta: {
      invalidates: [['ebookPage']],
      awaits: [['ebookPage']],
    },
  });

export const useCreateEBookMT = () => {
  return useMutation({
    mutationFn: (formValue: ICreateEBook) => {
      return ebookApi.create(formValue);
    },
  });
};
