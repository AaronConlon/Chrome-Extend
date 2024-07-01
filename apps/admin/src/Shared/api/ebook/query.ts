import { MutationOptions, queryOptions } from '@tanstack/react-query';
import { ebookApi } from '.';
import { ICreateEBook, IEbookPageParams } from './type';
export const ebookPageQO = (params: IEbookPageParams) =>
  queryOptions({
    queryKey: ['ebookPage', params],
    queryFn: () => ebookApi.page(params),
  });

export const mutationOPtions: Record<string, MutationOptions> = {
  create: {
    mutationFn: (formValue: ICreateEBook) => ebookApi.create(formValue),
    onError(error, variables, context) {
      console.log(error.message);
    },
  },
};
