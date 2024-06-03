import { cn } from '@chrome-extend/utils';
import { Input, InputProps } from '../Input';

export interface InputWithLabelProps {
  rootClass?: string;
  id: string;
  inputProps?: InputProps;
  labelName: string;
}

export function InputWithLabel({
  id,
  rootClass,
  inputProps,
  labelName,
}: InputWithLabelProps) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', rootClass)}>
      <label htmlFor={id}>{labelName}</label>
      <Input id={id} {...inputProps} />
    </div>
  );
}

InputWithLabel.displayName = 'InputWithLabel';
