import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { type QueryClient } from '@tanstack/react-query';
import '../Shared/styles/index.scss';

import Header from '../Shared/ui/Header';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Header />
      <div className="p-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
