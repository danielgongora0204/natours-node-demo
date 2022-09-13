import model from '../../models/user';
import { validateUser } from '../_helpers/auth.helper';
import Response from '../../constants/response';
import emailUtil from '../../utils/email';

const {
  Desc: { EmailDoesntExist }
} = Response;

export default (resetRequest) =>
  Promise.resolve(model.findOne({ email: resetRequest.email }))
    .then((userResult) =>
      validateUser(userResult, resetRequest.email, EmailDoesntExist)
    )
    .then((user) =>
      user.createPasswordResetToken().then((token) =>
        user.save({ validateBeforeSave: false }).then(() => {
          user.passwordResetToken = token;
          return user;
        })
      )
    )
    .then((user) =>
      emailUtil({
        email: user.email,
        message: `Submit a new PATCH request with your new password and confirmation password to: ${resetRequest.protocol}://${resetRequest.host}/api/v1/auth/reset-password/${user.passwordResetToken}`,
        subject: 'Natours Password Reset'
      }).catch((err) =>
        new Promise((resolve) => {
          user.passwordResetToken = undefined;
          user.passwordResetTokenExpiration = undefined;
          resolve();
        })
          .then(() => user.save({ validateBeforeSave: false }))
          .then(() => {
            throw err;
          })
      )
    )
    .catch((err) => {
      throw err;
    });
