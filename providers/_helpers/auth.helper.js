import Response from '../../constants/response';

const {
  unauthorized,
  Desc: { LoginFailed, Unauthorized }
} = Response;

export const isNullUser = (data) =>
  new Promise((resolve) => {
    if (!data) {
      resolve(false);
    }
    resolve(data);
  });

export const validateLogin = (result, data) =>
  new Promise((resolve, reject) => {
    if (!result) {
      reject(unauthorized(data, LoginFailed));
    }
    resolve(result);
  });

//TODO: This could be done directly in the database model, that way we wouldn't have to check if delete date exists
export const checkDeletedUser = (user) =>
  new Promise((resolve, reject) => {
    if (!user || user.deletedDate) reject(unauthorized(null, Unauthorized));
    resolve(user);
  });

export const checkPasswordUpdated = (changed) =>
  new Promise((resolve, reject) => {
    if (changed) reject(unauthorized(null, Unauthorized));
    resolve();
  });
