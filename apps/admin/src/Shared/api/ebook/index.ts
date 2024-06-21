import { request } from '../request';
import { IEbookPageParams, TEbookPageResult } from './type';

const resourcePrefix = '/ebook';

export const ebookApi = {
  page: async (params: IEbookPageParams) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 1));
    return request.get<TEbookPageResult>(resourcePrefix, { params });
  },
};

export * from './query';
export * from './type.d';
