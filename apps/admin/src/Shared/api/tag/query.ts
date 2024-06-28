import { queryOptions } from '@tanstack/react-query';
import { tagApi } from '.';

export const tagQueryKeys = {
  tags: ['tags'],
  addTags: ['add-tags'],
};

export const getAllTagQO = () =>
  queryOptions({
    queryKey: tagQueryKeys.tags,
    queryFn: () => tagApi.get(),
    select(data) {
      return data.data;
    },
  });

export const addTagQO = (tag: string) =>
  queryOptions({
    queryKey: tagQueryKeys.addTags,
    queryFn: () => tagApi.add(tag),
  });
