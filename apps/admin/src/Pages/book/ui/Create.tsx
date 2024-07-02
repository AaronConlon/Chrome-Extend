import {
  Button,
  Dialog,
  Input,
  InputWithLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@chrome-extend/shared-ui';
import { cn } from '@chrome-extend/utils';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { DeleteIcon, Trash2 } from 'lucide-react';
import { PiNotebookThin, PiPlus } from 'react-icons/pi';
import { z } from 'zod';
import { ICreateEBook, useCreateEBookMT } from '../../../Shared/api/ebook';
import { getAllTagQO } from '../../../Shared/api/tag';
import { regExpRecord } from '../../../Shared/config';
import FieldInfo from '../../../Shared/ui/FieldInfo';

export default function CreateEBook() {
  // 获取所有 tag
  const { data } = useQuery(getAllTagQO());
  const [open, setOpen] = useState(false);

  const createMT = useCreateEBookMT();

  // 上传下载描述和链接
  const form = useForm({
    defaultValues: {
      title: '书籍 A',
      author: '佚名',
      description: '这本书还行',
      cover:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAJAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABwQFBgEDAv/EADEQAAEDAwMCBAUCBwAAAAAAAAECAwQABREGEiExQRNRYZEHInGBoTLBFBUzUrHR4f/EABgBAAIDAAAAAAAAAAAAAAAAAAEDAAIE/8QAHBEAAgIDAQEAAAAAAAAAAAAAAAECEQMhMjEE/9oADAMBAAIRAxEAPwBvqSsrJDqwMnioiJmf1fxSTnu2T29BUiW+mM0pxSVK68JGSepqBJWFOKeaK0KHyKUlGdpGM/UHIH2+4qlYpyo9nJhSk7jKTgnOG8/4FcjyTIKghx9O3rvGKjSFLCVusuvfqwRt9M5Hn0/1XkxNSFhvLilk43FPWrqIqWSmXkBTgaWFuKWQvqT6Civm3Z8FZPdf7CigaIcoHElwkbinGenFVV+ukGwQDNucxxpgKCRjJKiewHv7VVfEfUEzTumZEu3NKXJW+GUKAzs3E84/H3pRzpGr9V21uHeXWUxm1eIl1zaVnJxxt6jtzQUSvo77ZcYV/tiZ9qmLdjqJTuyQcg4OR2qof1LbYs5yM4++fCXsdeAy22ryPPr5EVW/CO3tWjT0i3vTErluvqdLZRsKU4A4/u6ZyK9J+jC7MeSmUlMOS54jiNh38nJAOcde+OKbjUdqRm+hzW4m/hjDPBzzRXIP9DGOhx+BRSzXDlCQ1Zq+5SdR3WzMrkuBuU42hpk54SogfKeMfX0qmt1xVGW9GnMllTZ+ZsHkbhyB9eDTJ1AzHavJwhKX5MhwZCeSBn/p+tYjUWjbjc7vHmW5xhCXUHxS8spwcq54BJ4P4q5CPbdQulSn2nVNulYU2scdcYpx2Sf/ADmyR5pI8RWUqI6Eg4JHtSa1NpmLYLUCzOkPyVfKhBQEgKBGc+hzxWl+HV5etmnlR7i54akvlTbKxnYnA7jzOetCrYvJyNqAlSWSF9d37Cioem7gm6Q3pCFpWA8U5SOmEprtBjMbuKMDruJdHVzv4O13F9wqVsVHZV03gDBH3OR0HPlWVan65ZcBTZrwpscbVWnn3zx7UUVLDRTXe06wnXQyVWq9yApW0BdvKAlBz5cd+47c1yFaNSx2H2VaZvqUOnCktx1kLAVuTkEcY+X29aKKARu/BeJdImk30XmJKjSVTVqCJKClW3ajBwe3WiiioQ//2Q==',
      tags: [],
      downloadLinks: [],
    } as ICreateEBook,
    onSubmit: async ({ value }) => {
      // 提交表单
      console.log(value);
      await createMT.mutateAsync(value);
      // show success message and close dialog
      setOpen(false);
    },
    validatorAdapter: zodValidator,
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PiNotebookThin className="w-4 h-4 mr-2" />
        创建
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          form.reset();
          setOpen(false);
        }}
        onConfirm={async () => {
          await form.validateAllFields('submit');
          form.handleSubmit();
        }}
        title="创建电子书"
      >
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-[60%_auto] gap-4 my-4">
            <div>
              <form.Field
                name="title"
                validators={{
                  onChange: z.string().min(1, '标题不能为空'),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => (
                  <>
                    <InputWithLabel
                      id={field.name}
                      labelName="标题"
                      inputProps={{
                        placeholder: '标题',
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div>
              <form.Field
                name="author"
                validators={{
                  onChange: z.string().min(1, '作者不能为空'),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => (
                  <>
                    <InputWithLabel
                      id={field.name}
                      labelName="作者"
                      inputProps={{
                        placeholder: '作者',
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <form.Field
                name="description"
                validators={{
                  onChange: z
                    .string()
                    .min(1, '标题不能为空')
                    .max(100, '描述不能超过 100 字'),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => (
                  <>
                    <Textarea
                      labelName="简介"
                      placeholder="简介"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div className="pr-2">
              <form.Field
                name="cover"
                validators={{
                  onChange: z
                    .string()
                    .min(1, '封面地址不能为空')
                    .max(1024 * 32, '封面地址不能超过 1024 字'),
                }}
                children={(field) => (
                  <>
                    <InputWithLabel
                      id={field.name}
                      labelName="封面地址"
                      inputProps={{
                        placeholder: '封面URL',
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>
          {/* tags */}
          <div className="mb-4">
            <form.Field
              name="tags"
              mode="array"
              validators={{
                onChange: z.array(z.string().min(1, '至少一个标签')),
              }}
            >
              {(field) => (
                <div id={field.name}>
                  <Select
                    onValueChange={(value) => {
                      if (field.state.value.some((i) => i === value)) {
                        return;
                      }
                      // push to tags
                      field.pushValue(value);
                    }}
                  >
                    <SelectTrigger className="select-none">
                      <SelectValue placeholder="选择一个标签" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.map((i) => (
                          <SelectItem value={i.name} key={i.id}>
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-2 select-none">
                    {field.state.value.map((_, idx) => (
                      <Button className="group" variant={'secondary'}>
                        {field.state.value[idx]}
                        <span
                          className="transition-transform scale-0 group-hover:scale-100"
                          onClick={() => {
                            field.state.value = field.state.value.splice(
                              idx,
                              1
                            );
                          }}
                        >
                          <DeleteIcon className="relative w-4 h-4 left-2 top-[1px]" />
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>
          </div>

          {/* 下载链接 */}
          <form.Field
            name="downloadLinks"
            mode="array"
            validators={{
              onChange: z
                .array(
                  z.object({
                    description: z
                      .string()
                      .min(1, '不能为空')
                      .max(8, '不能超过 8 字'),
                    url: z
                      .string()
                      .regex(
                        regExpRecord.commonUrl,
                        '必须是有效的 http 或 https URL'
                      )
                      .min(1, '链接不能为空')
                      .max(100, '链接不能超过 100 字'),
                  })
                )
                .min(1, '至少一个下载链接'),
            }}
          >
            {(field) => (
              <div>
                <div className="flex justify-between">
                  <span>下载链接</span>
                  <span
                    className={cn('text-red-400 text-sm', {
                      'opacity-0': field.state.value.length !== 0,
                    })}
                  >
                    至少一个下载链接
                  </span>
                </div>
                {field.state.value.map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[96px_auto_48px] gap-4 my-4 items-center"
                  >
                    <form.Field
                      name={`downloadLinks[${idx}].description`}
                      validators={{
                        onChange: z
                          .string()
                          .min(1, '不能为空')
                          .max(8, '不能超过 8 字'),
                        onChangeAsyncDebounceMs: 500,
                      }}
                    >
                      {(subField) => {
                        return (
                          <div>
                            <Input
                              placeholder="描述"
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                            />
                            <FieldInfo field={subField} />
                          </div>
                        );
                      }}
                    </form.Field>
                    <form.Field
                      name={`downloadLinks[${idx}].url`}
                      validators={{
                        onChange: z
                          .string()
                          .regex(
                            regExpRecord.commonUrl,
                            '必须是有效的 http 或 https URL'
                          )
                          .min(1, '链接不能为空')
                          .max(100, '链接不能超过 100 字'),
                        onChangeAsyncDebounceMs: 500,
                      }}
                    >
                      {(subField) => {
                        return (
                          <div>
                            <Input
                              placeholder="链接"
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                            />
                            <FieldInfo field={subField} />
                          </div>
                        );
                      }}
                    </form.Field>
                    <Button
                      variant={'ghost'}
                      onClick={() => {
                        field.removeValue(idx);
                      }}
                      size={'sm'}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant={'secondary'}
                  className="w-full gap-2 py-3 mt-4"
                  onClick={() => {
                    field.pushValue({
                      description: '',
                      url: '',
                    });
                  }}
                >
                  <PiPlus className="w-4 h-4" />
                  新增下载链接
                </Button>
              </div>
            )}
          </form.Field>
        </form>
      </Dialog>
    </>
  );
}
