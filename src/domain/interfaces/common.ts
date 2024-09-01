export interface APIResponseType<T> {
  data: T;
  statusCode: number;
  isSuccess: boolean;
  message: string;
}
