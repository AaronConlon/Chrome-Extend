import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { Button, Pagination } from '@chrome-extend/shared-ui';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import type { ColDef, ICellRendererParams } from 'ag-grid-community'; // Column Definition
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { IoCloudDownloadOutline } from 'react-icons/io5';
import type {
  IDownloadLink,
  IEBookTag,
  IEbook,
} from '../../../Shared/api/ebook';
import { commonColDef } from '../../../Shared/config';

function DownloadLinksComponent(params: ICellRendererParams) {
  return params.value.map((link: IDownloadLink) => (
    <a
      key={link.id}
      href={link.url}
      className="p-1 text-sm underline rounded-sm underline-offset-2"
    >
      <Button size={'sm'} className="gap-2">
        <IoCloudDownloadOutline />
        {link.description}
      </Button>
    </a>
  ));
}

function TagsComponent(params: ICellRendererParams) {
  console.log(params.value);
  return params.value
    .map(({ Tag }: { Tag: IEBookTag }) => Tag.name)
    .map((name: string) => (
      <Button key={name} variant={'secondary'} size={'sm'}>
        <span className="inline-block truncate max-w-24">{name}</span>
      </Button>
    ));
}

export default function () {
  // Row Data: The data to be displayed.
  const route = useRouteContext({ from: '/book/' });

  console.log(route);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs: ColDef<IEbook>[] = [
    commonColDef.id,
    commonColDef.title,
    commonColDef.author,
    commonColDef.description,
    {
      ...commonColDef.tags,
      cellRenderer: TagsComponent,
    },
    {
      ...commonColDef.downloadLinks,
      cellRenderer: DownloadLinksComponent,
    },
  ];

  const navigate = useNavigate({
    from: '/book',
  });

  const onPaginationChange = (options: { page: number; limit: number }) => {
    navigate({
      search: {
        ...route.config.params,
        ...options,
      },
    });
  };

  return (
    <div>
      <div
        className="relative ag-theme-quartz" // applying the grid theme
        style={{ height: 300, maxWidth: 1920 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={route.data.items}
          columnDefs={colDefs}
          overlayNoRowsTemplate="没有匹配的数据"
        />
        <Pagination
          className="absolute inset-x-0 bottom-0 rounded-none"
          onPaginationChange={onPaginationChange}
          total={route.data.total}
          limit={route.config.params.limit}
          page={route.config.params.page}
          showTotal
        />
      </div>
    </div>
  );
}
