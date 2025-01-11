export interface IQueryOptions {
  filterRelational: {
    field?: string;
    value?: string;
  };
  filterBy: {
    field?: string;
    value?: string;
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
