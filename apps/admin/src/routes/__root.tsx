import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import '../Shared/styles/index.scss';

import Header from '../Shared/ui/Header';

export const Route = createRootRoute({
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
