import Response from '../../constants/response';

const {
  unauthorized,
  Desc: { Unauthorized }
} = Response;

export const validateAuthObject = (
  result,
  data = null,
  message = Unauthorized
) =>
  new Promise((resolve, reject) => {
    if (!result) reject(unauthorized(data, message));
    resolve(result);
  });

//TODO: This could be done directly in the database model, that way we wouldn't have to check if delete date exists
export const validateUser = (user, data = null, message = Unauthorized) =>
  new Promise((resolve, reject) => {
    if (!user || user.deletedDate) reject(unauthorized(data, message));
    resolve(user);
  });

export const checkPasswordUpdated = (changed) =>
  new Promise((resolve, reject) => {
    if (changed) reject(unauthorized(null, Unauthorized));
    resolve();
  });
