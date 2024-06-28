import { WebRequest } from '@chrome-extend/webRequest';
import { redirect } from '@tanstack/react-router';

export const instance = new WebRequest({
  createOptions: {
    baseURL: '/api',
  },
  requestInterceptors: {
    response: (response) => {
      if (response.status === 401) {
        // redirect to login page
        // TODO add login page
        redirect({ to: '/' });
      }
      return response;
    },
  },
});

export const request = instance.request;
