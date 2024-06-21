import { Input } from '@chrome-extend/shared-ui';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { debounce } from 'lodash-es';
import CreateEBook from './Create';

export function Filter() {
  const route = useRouteContext({ from: '/book/' });
  const navigate = useNavigate({ from: '/book' });
  const [query, setQuery] = useState(route.config.params.query);

  const onSearch = debounce((query: string) => {
    navigate({ search: { ...route.config.params, query } });
  }, 200);

  return (
    <div className="flex items-center justify-between mb-4">
      <Input
        value={query}
        placeholder="search..."
        className="w-48"
        prefixIcon="🔍"
        onChange={({ target: { value } }) => {
          setQuery(value);
          onSearch(value);
        }}
      />
      <CreateEBook />
    </div>
  );
}
