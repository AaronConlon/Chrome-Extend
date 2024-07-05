import {
  MutationCache,
  QueryClient,
  QueryKey,
  matchQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1.5,
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onSuccess(data, variables, context, mutation): unknown {
      queryClient.invalidateQueries({
        predicate: (query) =>
          // invalidate all matching tags at once
          // or nothing if no meta is provided
          mutation.meta?.invalidates?.some((queryKey) =>
            matchQuery({ queryKey }, query)
          ) ?? false,
      });
      const awaits = mutation.meta?.awaits;
      if (Array.isArray(awaits)) {
        return queryClient.invalidateQueries(
          { queryKey: awaits },
          { cancelRefetch: false }
        );
      }
    },
  }),
});

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: Array<QueryKey>;
      awaits?: Array<QueryKey>;
    };
  }
}

export default queryClient;
