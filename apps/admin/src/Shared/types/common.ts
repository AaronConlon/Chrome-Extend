export interface IPage {
  // Current page number
  page: number;
  // Number of items per page
  limit: number;
}

export interface IPageResult<T> {
  total: number;
  items: T[];
}
