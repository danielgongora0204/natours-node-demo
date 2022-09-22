import updatePassword from '../../providers/authentication/updatePassword.provider';

export default ({ body, userId }) =>
  Promise.resolve(body).then(updatePassword(userId));
