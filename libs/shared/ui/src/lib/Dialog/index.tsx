'use client';

import { cn } from '@chrome-extend/utils';
import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { Button } from '../Button';

export interface IDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  title?: string;
  closeIcon?: React.ReactNode;
  footer?: React.ReactNode;
  outsideClose?: boolean;
  container?: Element | DocumentFragment;
  loading?: boolean;
}

export const Dialog = ({
  open,
  onClose,
  children,
  title = '',
  closeIcon,
  footer,
  className = '',
  containerClassName = '',
  onConfirm,
  outsideClose = true,
  container,
  loading = false,
}: IDialogProps) => {
  const [zIndex, setZIndex] = useState<number>(globalThis.__Z_INDEX__ || 50);
  useEffect(() => {
    if (open) {
      setZIndex((prev) => prev + 1);
    }
    return () => {
      if (globalThis.__Z_INDEX__) {
        globalThis.__Z_INDEX__ -= 1;
      }
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      style={{ zIndex }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        e.stopPropagation();
        if (outsideClose) {
          onClose();
        }
      }}
    >
      <div
        className={cn(
          'flex flex-col gap-2 bg-white text-primary rounded-md p-4 shadow-lg min-w-[600px] min-h-[360px] animate-fade-up animate-duration-[200ms]',
          containerClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between group">
          <span>{title}</span>
          {closeIcon || (
            <IoIosClose
              className="inline-block transition-transform scale-100 cursor-pointer group-hover:scale-115 group-hover:bg-gray-50"
              onClick={onClose}
              size={18}
            />
          )}
        </div>
        <main
          className={cn(
            'max-h-[calc(90vh-100px)] overflow-h-auto overflow-x-hidden',
            className
          )}
        >
          {children}
        </main>
        {footer === undefined ? (
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant={'secondary'} onClick={onClose}>
              取消
            </Button>
            <Button onClick={onConfirm} disabled={loading}>
              {loading && (
                <RotateCw
                  className="animate-spin animate-duration-[1000ms] mr-1"
                  size={14}
                />
              )}
              确定
            </Button>
          </div>
        ) : (
          footer
        )}
      </div>
    </div>,
    container ?? document.body.querySelector('#root') ?? document.body
  );
};
