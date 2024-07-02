import { IPage, IPageResult } from '../../types/common';

/**
 * 电子书分页请求参数
 */
export interface IEbookPageParams extends IPage {
  query?: string;
}

export interface IEBookTag {
  id: number;
  name: string;
  createdAt: string;
}

export interface IDownloadLink {
  id: number;
  url: string;
  description: string;
}

/**
 * 电子书信息
 */
export interface IEbook {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  tags: IEBookTag[];
  downloadLinks: IDownloadLink[];
}

export type TEbookPageResult = IPageResult<IEbook>;

export interface ICreateEBook extends Omit<IEbook, 'id'> {
  tags: string[];
  downloadLinks: {
    url: string;
    description: string;
  }[];
}