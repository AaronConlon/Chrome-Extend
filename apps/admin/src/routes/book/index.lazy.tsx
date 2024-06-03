import { createLazyFileRoute } from '@tanstack/react-router';
import { BookPage } from '../../Pages/book/index';

export const Route = createLazyFileRoute('/book/')({
  component: () => <BookPage />,
});
