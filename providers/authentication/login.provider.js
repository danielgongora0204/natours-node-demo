import model from '../../models/user';
import empty from '../_helpers/empty.helper';
import { createToken } from '../../utils/jwt';
import { isNullUser, validateLogin } from '../_helpers/auth.helper';

export default (user) =>
  empty(user)
    .then(() => model.findOne({ email: user.email }).select('+password'))
    .then(isNullUser)
    .then((nullResult) => validateLogin(nullResult, user))
    .then((result) =>
      result
        .passwordAuthentication(user.password, result.password)
        .then((valid) => (!valid ? false : result))
    )
    .then((nullResult) => validateLogin(nullResult, user))
    .then(createToken)
    .catch((err) => {
      throw err;
    });
