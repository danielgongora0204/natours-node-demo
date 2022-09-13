import resetPassword from '../../providers/authentication/passwordReset.provider';

export default ({ body, params: { token } }) =>
  Promise.resolve(body).then(resetPassword(token));
