import type { ColDef } from 'ag-grid-community'; // Column Definition

export type CommonColDefKey =
  | 'id'
  | 'title'
  | 'author'
  | 'description'
  | 'tags'
  | 'downloadLinks'
  | 'operation';

export const commonColDef: Record<CommonColDefKey, ColDef> = {
  id: {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  title: {
    field: 'title',
    headerName: '标题',
  },
  author: {
    field: 'author',
    headerName: '作者',
  },
  description: {
    field: 'description',
    headerName: '描述',
    flex: 1,
  },
  tags: {
    field: 'tags',
    headerName: '标签',
  },
  downloadLinks: {
    field: 'downloadLinks',
    headerName: '下载链接',
  },
  operation: {
    field: 'operation',
    headerName: '操作',
    pinned: 'right',
  },
};
