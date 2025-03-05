import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IQueryOptions } from './types/query-options';
import { IPaginationOptions } from './types/pagination-options';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';

export const applyQueryFilters = <T extends ObjectLiteral>({
  queryBuilder,
  queryOptions,
  paginationOptions,
  nameTable,
}: {
  queryBuilder: SelectQueryBuilder<T>;
  queryOptions: IQueryOptions;
  paginationOptions: IPaginationOptions;
  nameTable: string;
}) => {
  const { filterRelational, filterBy, search, order } = queryOptions;

  if (filterRelational && filterRelational.field) {
    queryBuilder.andWhere(
      `${nameTable}.${filterRelational.field} = :filterRelationalValue`,
      {
        filterRelationalValue: filterRelational.value,
      },
    );
  }

  if (filterBy && filterBy.field) {
    queryBuilder.andWhere(`${nameTable}.${filterBy.field} = :filterByValue`, {
      filterByValue: filterBy.value,
    });
  }

  if (search && search.field) {
    queryBuilder.andWhere(`${nameTable}.${search.field} LIKE :searchValue`, {
      searchValue: `%${search.value}%`,
    });
  }

  queryBuilder.orderBy(
    `${nameTable}.${order.field ?? 'createdAt'}`,
    (order.direction?.toUpperCase() as 'ASC' | 'DESC') ?? 'DESC',
  );

  queryBuilder
    .take(paginationOptions.limit)
    .skip((paginationOptions.page - 1) * paginationOptions.limit);
};

// export const applyPagination = <T extends ObjectLiteral>({
//   queryBuilder,
// }: {
//   queryBuilder: SelectQueryBuilder<T>;
// }) => {
//   queryBuilder
//     .take(paginationOptions.limit)
//     .skip((paginationOptions.page - 1) * paginationOptions.limit);
// };

export const normalizeQueryOptions = (query: PaginationAndFilterDto) => {
  const page = query?.page ?? 1;
  let limit = query?.limit ?? 10;
  if (limit > 50) {
    limit = 50;
  }

  const queryOptions = {
    filterRelational: {
      field: query.filterRelationalField,
      value: query.filterRelationalValue,
    },
    filterBy: {
      field: query.filterByField,
      value: query.filterByValue,
    },
    order: {
      field: query.orderField,
      direction: query.orderDirection,
    },
    search: {
      field: query.searchField,
      value: query.searchValue,
    },
  } as const;
  return { page, limit, queryOptions };
};
