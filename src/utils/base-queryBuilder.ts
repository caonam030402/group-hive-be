import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IQueryOptions } from './types/query-options';
import { IPaginationOptions } from './types/pagination-options';

export const applyQueryFilters = <T extends ObjectLiteral>({
  queryBuilder,
  queryOptions,
  paginationOptions,
}: {
  queryBuilder: SelectQueryBuilder<T>;
  queryOptions: IQueryOptions;
  paginationOptions: IPaginationOptions;
}) => {
  const { filterRelational, filterBy, search, order } = queryOptions;

  if (filterRelational && filterRelational.field) {
    queryBuilder.andWhere(
      `chat.${filterRelational.field} = :filterRelationalValue`,
      {
        filterRelationalValue: filterRelational.value,
      },
    );
  }

  if (filterBy && filterBy.field) {
    queryBuilder.andWhere(`chat.${filterBy.field} = :filterByValue`, {
      filterByValue: filterBy.value,
    });
  }

  if (search && search.field) {
    queryBuilder.andWhere(`chat.${search.field} LIKE :searchValue`, {
      searchValue: `%${search.value}%`,
    });
  }

  queryBuilder.orderBy(
    `chat.${order.field ?? 'createdAt'}`,
    (order.direction?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC',
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
