import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { DeleteIcon } from 'lucide-react';
import { PiNotebookThin, PiPlus } from 'react-icons/pi';
import { z } from 'zod';
import { IDownloadLink } from '../../../Shared/api/ebook';
import { getAllTagQO } from '../../../Shared/api/tag';
import { regExpRecord } from '../../../Shared/config';
import FieldInfo from '../../../Shared/ui/FieldInfo';

export default function CreateEBook() {
  // 获取所有 tag
  const { data } = useQuery(getAllTagQO());

  // 上传下载描述和链接
  const form = useForm({
    defaultValues: {
      title: '书籍 A',
      author: '佚名',
      description: '这本书还行',
      cover: '',
      tags: [] as string[],
      downloadLinks: [] as Omit<IDownloadLink, 'id'>[],
    },
    onSubmit: async ({ value }) => {
      // 提交表单
    },
    validatorAdapter: zodValidator,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PiNotebookThin className="w-4 h-4 mr-2" />
          创建
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增电子书</DialogTitle>
          <DialogDescription>
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

              <div className="mb-4">
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
                        className="grid grid-cols-[96px_auto_48px] gap-4 my-4"
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
                          variant={'destructive'}
                          onClick={() => {
                            field.removeValue(idx);
                          }}
                        >
                          删除
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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              variant={'secondary'}
              onClick={() => {
                form.reset();
              }}
            >
              取消
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              color="gray"
              onClick={async (e) => {
                await form.validateAllFields('submit');
                form.handleSubmit();
                e.preventDefault();
              }}
            >
              确定
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
