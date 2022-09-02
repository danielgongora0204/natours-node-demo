import {
  skipValidate,
  initialSearch,
  querySort,
  querySelect,
  queryPage,
  queryLimit
} from '../_helpers/query.helper';
import model from '../../models/user';

export default (searchQuery, filter) =>
  initialSearch(model)
    .then((documentCount) =>
      skipValidate((filter.page - 1) * filter.limit, documentCount)
    )
    .then(() => {
      const query = model.find(searchQuery);
      querySort(query, filter.sort);
      querySelect(query, filter.fields);
      queryPage(query, filter.limit, filter.page);
      return queryLimit(query, filter.limit);
    })
    .catch((err) => {
      throw err;
    });
