import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { Button, Pagination } from '@chrome-extend/shared-ui';
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router';
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
    {
      field: 'cover',
      headerName: '封面',
      width: 350,
      cellRenderer: (params: ICellRendererParams) => (
        <img
          src={params.value}
          alt={params.data.title}
          className="object-cover w-full h-full rounded-md"
        />
      ),
    },
    {
      ...commonColDef.title,
      flex: 1,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between pt-2">
            <Link to={`/book/${params.data.id}`} className="text-lg font-bold">
              《{params.data.title}》
            </Link>
            <div className="text-sm text-gray-500">{params.data.author}</div>
          </div>
          <div className="w-full text-sm text-gray-500 line-clamp-2 text-wrap">
            {params.data.description}
          </div>
        </div>
      ),
    },
    {
      ...commonColDef.tags,
      cellRenderer: TagsComponent,
    },
    {
      ...commonColDef.downloadLinks,
      cellRenderer: DownloadLinksComponent,
    },
    commonColDef.operation,
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
        style={{
          height: 'calc(100vh - 200px)',
          maxHeight: 960,
          maxWidth: 1920,
        }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={route.data.items}
          columnDefs={colDefs}
          overlayNoRowsTemplate="没有匹配的数据"
          suppressCellFocus={true}
          rowHeight={100}
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
