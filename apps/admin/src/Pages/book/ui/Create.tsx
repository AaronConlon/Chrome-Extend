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
  InputWithLabel,
  Textarea,
} from '@chrome-extend/shared-ui';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { PiNotebookThin } from 'react-icons/pi';
import { z } from 'zod';
import FieldInfo from '../../../Shared/ui/FieldInfo';

export default function CreateEBook() {
  const form = useForm({
    defaultValues: {
      title: '书籍 A',
      author: '佚名',
      description: '这本书还行',
      cover: '',
      tags: [],
      downloadLink: [],
    },
    onSubmit: async (values) => {
      console.log(values);
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
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={'secondary'}>取消</Button>
          </DialogClose>
          <DialogClose>
            <Button color="gray">确定</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
