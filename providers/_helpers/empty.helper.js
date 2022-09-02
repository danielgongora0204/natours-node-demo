import Response from '../../constants/response';
import hasNull from '../../functions/_validators/general/hasNull';

const {
  error,
  Desc: { EmptyRequest },
  Codes: { BadRequest }
} = Response;

export default (obj) =>
  new Promise((resolve, reject) => {
    if (hasNull(obj)) {
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
