import { request } from '../request';
import { ICreateEBook, IEbookPageParams, TEbookPageResult } from './type';

const resourcePrefix = '/ebook';

export const ebookApi = {
  page: async (params: IEbookPageParams) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 1));
    return request.get<TEbookPageResult>(resourcePrefix, { params });
  },
  create: async (data: ICreateEBook) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 1));
    return request.post(resourcePrefix, data);
  },
};

export * from './query';
export * from './type.d';

