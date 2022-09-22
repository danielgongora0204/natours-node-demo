import deleteAccount from '../../providers/authentication/deleteAccount.provider';

export default ({ body, userId }) =>
  Promise.resolve(body).then(deleteAccount(userId));
