import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sticky top-0 flex gap-2 p-2 md:p-4">
        <Link to="/" className="[&.active]:font-bold">
          H
        </Link>
        <div className="flex gap-2 ml-auto">
          <Link
            to="/about"
            className="[&.active]:font-bold [&.active]:text-sky-500"
          >
            About
          </Link>
          <Link
            to="/book"
            className="[&.active]:font-bold [&.active]:text-sky-500"
          >
            Book
          </Link>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
