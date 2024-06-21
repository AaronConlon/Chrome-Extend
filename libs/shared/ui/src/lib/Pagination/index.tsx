import { cn } from '@chrome-extend/utils';
import * as React from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  onPaginationChange: (options: { page: number; limit: number }) => void;
  total: number;
  limit: number;
  page: number;
  showTotal?: boolean;
  maxRenderCount?: number;
  limitOptions?: number[];
  slotFooter?: React.ReactNode;
}

const Pagination = React.forwardRef<HTMLInputElement, PaginationProps>(
  (
    {
      onPaginationChange,
      maxRenderCount = 2,
      total,
      limit,
      page,
      showTotal,
      limitOptions = [1, 2, 5, 10],
      slotFooter,
      ...props
    },
    ref
  ) => {
    const totalPage = Math.ceil(total / limit);
    const currentPageOptionLength = Math.min(
      totalPage,
      page + maxRenderCount - 1
    );
    const pageOptionNumbers = React.useRef(
      Array.from(
        {
          length: currentPageOptionLength,
        },
        (_, i) => i + page
      )
    );
    // items
    const renderPageNumbers = () => {
      const navItems: React.ReactNode[] = [
        <Button variant={'ghost'} size={'sm'} disabled={page === 1}>
          <GrLinkPrevious />
        </Button>,
        ...pageOptionNumbers.current.map((number) => (
          <Button
            className={cn(
              number === page && 'bg-gray-100',
              'hover:bg-gray-100'
            )}
            key={number}
            variant={'ghost'}
            size={'sm'}
            onClick={() => onPaginationChange({ page: number, limit })}
          >
            {number}
          </Button>
        )),
      ];

      // add dots
      if (totalPage > maxRenderCount + 1) {
        navItems.push(
          <Button variant={'ghost'} size={'sm'} disabled={page === totalPage}>
            ...
          </Button>
        );
      }

      if (totalPage > maxRenderCount) {
        navItems.push(
          <Button
            variant={'ghost'}
            size={'sm'}
            disabled={page === totalPage}
            onClick={() => {
              onPaginationChange({
                page: totalPage,
                limit,
              });
            }}
          >
            {totalPage}
          </Button>
        );
      }

      // next page
      navItems.push(
        <Button
          variant={'ghost'}
          size={'sm'}
          disabled={page === totalPage}
          onClick={() =>
            onPaginationChange({
              page: page + 1,
              limit,
            })
          }
        >
          <GrLinkNext />
        </Button>
      );

      // page limit options
      navItems.push(
        <Popover>
          <PopoverTrigger>
            <Button size="sm" className="rounded-sm" variant={'ghost'}>
              每页 {limit} 条
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="flex flex-col w-24 gap-1 p-2">
            {limitOptions.map((option) => (
              <Button
                key={option}
                className={cn(option === limit && 'bg-gray-100')}
                size="sm"
                variant={'ghost'}
                onClick={() =>
                  onPaginationChange({
                    page: 1,
                    limit: option,
                  })
                }
              >
                {option} 条/页
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      );

      return navItems;
    };

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'flex flex-wrap gap-1 items-center justify-end p-2 bg-white border border-gray-200 rounded-md shadow-sm select-none',
          props?.className
        )}
      >
        {slotFooter && <div className="flex-grow">{slotFooter}</div>}
        {/* total */}
        {showTotal && (
          <div className="text-sm text-gray-500">
            共 <span className="text-primary">{total}</span> 条记录
          </div>
        )}
        {/* items*/}
        {renderPageNumbers()}
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
