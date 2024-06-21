import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export interface WebRequestOptions {
  createOptions?: CreateAxiosDefaults;
  requestInterceptors?: {
    request?: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig;
    response?: (response: AxiosResponse) => AxiosResponse;
  };
}

export class WebRequest {
  request: AxiosInstance;
  constructor({ createOptions = {}, requestInterceptors }: WebRequestOptions) {
    this.request = axios.create({
      withCredentials: true,
      timeout: 10000,
      ...createOptions,
    });
    const { request, response } = requestInterceptors ?? {};
    if (request) this.request.interceptors.request.use(request);
    if (response) this.request.interceptors.response.use(response);
  }
}
