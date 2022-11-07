import model from '../../models/user';
import { validateUser, checkPasswordUpdated } from '../_helpers/auth.helper';

export default (decoded) =>
  Promise.resolve(model.findById(decoded.id))
    .then(validateUser)
    .then((result) =>
      Promise.resolve(result.changedPasswordAfter(decoded.iat))
        .then(checkPasswordUpdated)
        .then(() => result)
    )
    .catch((err) => {
      throw err;
    });
