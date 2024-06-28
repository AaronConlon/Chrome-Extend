import { request } from '../request';
import { ITag } from './type.d';

const resourcePrefix = '/tag';

export const tagApi = {
  get: () => request.get<ITag[]>(resourcePrefix),
  add: (name: string) => request.post(resourcePrefix, { name }),
};

export * from './query';
export * from './type.d';
