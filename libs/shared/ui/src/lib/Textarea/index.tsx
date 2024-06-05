import { cn } from '@chrome-extend/utils';
import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelName?: string;
  labelClass?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, labelClass, labelName, ...props }, ref) => {
    return (
      <>
        {labelName && (
          <label
            className={cn('font-bold inline-block mb-1.5', labelClass)}
            htmlFor={props.id as string}
          >
            {labelName}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
