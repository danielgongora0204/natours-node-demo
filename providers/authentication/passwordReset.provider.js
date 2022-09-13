import model from '../../models/user';
import { cryptoHash } from '../../utils/crypt';
import { validateUser } from '../_helpers/auth.helper';
import Response from '../../constants/response';

const {
  Desc: { TokenExpired }
} = Response;

export default (token) => (body) =>
  cryptoHash(token)
    .then((hash) =>
      model.findOne({
        passwordResetToken: hash,
        passwordResetTokenExpiration: { $gt: Date.now() }
      })
    )
    .then((userResult) => validateUser(userResult, null, TokenExpired))
    .then((user) => {
      user.password = body.password;
      user.passwordConfirm = body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiration = undefined;
      return user;
    })
    .then((user) => user.save())
    .catch((err) => {
      throw err;
    });
