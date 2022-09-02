import getUser from '../../providers/user/getUsers.provider';

export default (searchQuery, filter) =>
  Promise.resolve(getUser(searchQuery, filter));
