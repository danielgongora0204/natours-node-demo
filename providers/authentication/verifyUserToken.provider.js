import model from '../../models/user';
import {
  checkDeletedUser,
  checkPasswordUpdated
} from '../_helpers/auth.helper';

export default (decoded) =>
  Promise.resolve(model.findById(decoded.id))
    .then(checkDeletedUser)
    .then((result) => result.changedPasswordAfter(decoded.iat))
    .then(checkPasswordUpdated)
    .catch((err) => {
      throw err;
    });
