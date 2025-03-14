export interface IQueryOptions {
  filterRelational: {
    field?: string;
    value?: string;
  };
  filterBy: {
    field?: string;
    value?: string | number | boolean;
  };
  order: {
    field?: string;
    direction?: 'asc' | 'desc';
  };
  search: {
    field?: string;
    value?: string;
  };
}
