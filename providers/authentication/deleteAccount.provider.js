import model from '../../models/user';
import { validateAuthObject, validateUser } from '../_helpers/auth.helper';
import Response from '../../constants/response';

const {
  Desc: { PasswordValidationFailed }
} = Response;

export default (userId) => (body) =>
  Promise.resolve(model.findById(userId).select('+password'))
    .then((user) => validateUser(user))
    .then((result) =>
      result
        .passwordAuthentication(body.password, result.password)
        .then((valid) => (!valid ? false : result))
    )
    .then((user) => validateAuthObject(user, body, PasswordValidationFailed))
    .then((user) => {
      user.deletedDate = Date.now();
      return user;
    })
    .then((user) => user.save({ validateBeforeSave: false }))
    .catch((err) => {
      throw err;
    });
