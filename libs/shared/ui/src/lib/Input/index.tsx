import * as React from 'react';

import { cn } from '@chrome-extend/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // prefix icon and suffix icon
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffixIcon, prefixIcon, ...props }, ref) => {
    if (suffixIcon || prefixIcon) {
      return (
        <div className={cn('relative', className)}>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              prefixIcon && 'pl-7',
              suffixIcon && 'pr-7',
              className
            )}
            ref={ref}
            {...props}
          />
          {suffixIcon && (
            <span className="absolute right-2 top-[50%] transform -translate-y-[50%]">
              {suffixIcon}
            </span>
          )}
          {prefixIcon && (
            <span className="absolute left-2 top-[50%] transform -translate-y-[50%]">
              {prefixIcon}
            </span>
          )}
        </div>
      );
    }
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
