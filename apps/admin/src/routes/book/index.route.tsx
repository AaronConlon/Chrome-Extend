import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';
import { ebookPageQO } from '../../Shared/api/ebook';
import Pending from '../../Shared/ui/Pending';

const schema = z.object({
  page: z.number().catch(1),
  query: z.string().catch(''),
  limit: z.number().catch(10),
});

export type TEBookSearch = z.infer<typeof schema>;

export const Route = createFileRoute('/book/')({
  validateSearch: schema,
  beforeLoad({ context: { queryClient }, search }) {
    // 匹配此路由时，调用此函数
    const { query, limit, page } = search;
    return queryClient.ensureQueryData(
      ebookPageQO({
        query,
        limit,
        page,
      })
    );
  },
  pendingComponent: Pending,
});
