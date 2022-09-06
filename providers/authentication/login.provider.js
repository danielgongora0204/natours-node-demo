import model from '../../models/user';
import { hasNull } from '../_helpers/empty.helper';
import { createToken } from '../../utils/jwt';
import { validateAuthObject, validateUser } from '../_helpers/auth.helper';
import Response from '../../constants/response';

const {
  Desc: { LoginFailed }
} = Response;

export default (user) =>
  hasNull(user)
    .then(() => model.findOne({ email: user.email }).select('+password'))
    .then((userResult) => validateUser(userResult, user, LoginFailed))
    .then((result) =>
      result
        .passwordAuthentication(user.password, result.password)
        .then((valid) => (!valid ? false : result))
    )
    .then((nullResult) => validateAuthObject(nullResult, user, LoginFailed))
    .then(createToken)
    .catch((err) => {
      throw err;
    });
