import model from '../../models/user';
import { validateAuthObject, validateUser } from '../_helpers/auth.helper';
import { createToken } from '../../utils/jwt';
import Response from '../../constants/response';

const {
  Desc: { PasswordValidationFailed }
} = Response;

export default (userId) => (body) =>
  Promise.resolve(model.findById(userId).select('+password'))
    .then((user) => validateUser(user))
    .then((result) =>
      result
        .passwordAuthentication(body.currentPassword, result.password)
        .then((valid) => (!valid ? false : result))
    )
    .then((user) => validateAuthObject(user, body, PasswordValidationFailed))
    .then((user) => {
      user.password = body.password;
      user.passwordConfirm = body.passwordConfirm;
      return user;
    })
    .then((user) => user.save().then(() => createToken(user)))
    .catch((err) => {
      throw err;
    });
