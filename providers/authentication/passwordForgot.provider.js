import model from '../../models/user';
import { validateUser } from '../_helpers/auth.helper';
import Response from '../../constants/response';

const {
  Desc: { EmailDoesntExist }
} = Response;

export default (email) =>
  Promise.resolve(model.findOne({ email: email }))
    .then((userResult) => validateUser(userResult, email, EmailDoesntExist))
    .catch((err) => {
      throw err;
    });
