import Response from '../../constants/response';
import hasNullValidator from '../../functions/_validators/general/hasNull';

const {
  error,
  Desc: { EmptyRequest },
  Codes: { BadRequest }
} = Response;

export const hasNull = (obj) =>
  new Promise((resolve, reject) => {
    if (hasNullValidator(obj)) {
      reject(
        error(
          BadRequest,
          'The data provided is empty, please verify it, and try again.',
          EmptyRequest,
          null
        )
      );
    }
    resolve();
  });

export const notNull = (data) =>
  new Promise((resolve) => {
    if (!data) {
      resolve(false);
    }
    resolve(data);
  });
