import updateUser from '../../providers/authentication/updateAccount.provider';

export default ({ body, userId }) =>
  Promise.resolve(body).then(updateUser(userId));
