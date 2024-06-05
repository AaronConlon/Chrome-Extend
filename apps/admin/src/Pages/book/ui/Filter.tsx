import { Input } from '@chrome-extend/shared-ui';
import CreateEBook from './Create';

export function Filter() {
  return (
    <div className="flex items-center justify-between mb-4">
      <Input placeholder="search..." className="w-48" prefixIcon="🔍" />
      <CreateEBook />
    </div>
  );
}
