import { Input } from '@chrome-extend/shared-ui';
import { useForm } from '@tanstack/react-form';

export function Filter() {
  const form = useForm({
    defaultValues: {
      keyword: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      alert('Form submitted:' + value.keyword);
    },
  });

  return (
    <div>
      <div className="flex">
        <h2 className="text-2xl font-bold">Filter</h2>
        <button>ADD</button>
      </div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="keyword"
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="search by title, author, or ISBN"
                suffixIcon={'🔍'}
                prefixIcon={'📚'}
                disabled
                className="w-48"
              />
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
