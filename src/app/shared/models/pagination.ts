export type Pagination<T> = {
  pageInde: number;
  pageSize: number;
  count: number;
  data: T[];
};
