import { clsx, type ClassValue } from 'clsx';
import createTransformer from 'tailwind-group-variant';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS class transformer
 * hover:(text-red-100,bg-white) => hover:text-red-100 hover:bg-white
 */
export const ev = createTransformer();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
