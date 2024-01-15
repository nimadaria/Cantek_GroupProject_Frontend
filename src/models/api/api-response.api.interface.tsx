export interface IApiResponse<T> {
  status: string;
  body?: T;
  errorCode?: string;
  errorMsg?: string;
}
