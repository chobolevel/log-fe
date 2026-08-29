export interface ApiErrorResponse {
  error_code: string;
  error_message: string;
}

export interface Pageable<T> {
  page: number;
  size: number;
  data: T[];
  total_count: number;
}
