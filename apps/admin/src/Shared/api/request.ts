import { WebRequest } from '@chrome-extend/webRequest';

export const instance = new WebRequest({
  createOptions: {
    baseURL: '/api',
  },
});

export const request = instance.request;
