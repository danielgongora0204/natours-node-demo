import Response from '../../constants/response';
import {
  sortingDefault,
  selectDefault,
  limitDefault
} from '../../constants/providers';

const { notFound } = Response;

//TODO: Check if this validation works properly
export const skipValidate = (skip, documentcount) =>
  new Promise((resolve, reject) => {
    if (skip >= documentcount) {
      reject(notFound(null));
    }
    resolve();
  });

export const initialSearch = (entity) => entity.countDocuments();

export const querySort = (query, sort) =>
  sort ? query.sort(sort) : query.sort(sortingDefault);

export const querySelect = (query, fields) =>
  fields ? query.select(fields) : query.select(selectDefault);

export const queryPage = (query, limit, page) =>
  limit && page ? query.skip((page - 1) * limit) : query;

export const queryLimit = (query, limit) =>
  limit ? query.limit(limit) : query.limit(limitDefault);
