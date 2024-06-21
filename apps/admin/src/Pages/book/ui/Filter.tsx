import { Input } from '@chrome-extend/shared-ui';
import { useNavigate, useRouter } from '@tanstack/react-router';
import CreateEBook from './Create';

export function Filter() {
  const navigate = useNavigate({ from: '/book' });
  const router = useRouter();
  const [v, setV] = useState(router.latestLocation.search.query);

  return (
    <div className="flex items-center justify-between mb-4">
      <Input
        value={v}
        placeholder="search..."
        className="w-48"
        prefixIcon="🔍"
        onChange={({ target: { value } }) => {
          setV(value);
          navigate({
            search: (prev) => ({ ...prev, query: value }),
          });
        }}
      />
      <CreateEBook />
    </div>
  );
}
