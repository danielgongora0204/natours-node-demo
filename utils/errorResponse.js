import Response from '../constants/response';
import unknown from '../constants/general';
import {
  castErrorName,
  duplicateKeyCode,
  validationError
} from '../constants/errorHandler';

const {
  error,
  replaceKeyWord,
  ReplacementKeyWords: { Path, Value },
  Desc: { CastError, DuplicateKey, ValidationError },
  Codes: { InternalServerError, BadRequest }
} = Response;

const _createResponse = (data) => {
  switch (true) {
    case data.name === castErrorName.toString():
      data.statusCode = BadRequest;
      data.message = replaceKeyWord(CastError, [
        { text: Path, replacement: data.path },
        { text: Value, replacement: data.value }
      ]);
      break;
    case data.code === duplicateKeyCode:
      data.statusCode = BadRequest;
      data.message = replaceKeyWord(DuplicateKey, [
        {
          text: Value,
          replacement: data.stack.match(/(["'])(?:\\.|[^\\])*?\1/)[0].toString()
        }
      ]);
      break;
    case data.name === validationError.toString():
      data.statusCode = BadRequest;
      data.message = ValidationError;
      break;
    default:
      break;
  }
  return error(data.statusCode, data.error, data.message, data.stack);
};

export default (res, e, logger = false, code = InternalServerError) =>
  Promise.resolve(
    _createResponse({
      statusCode: code,
      error: e.data ?? e.message,
      message: e.desc ?? e.message ?? unknown,
      stack: e.stack ?? unknown,
      name: e.name,
      path: e.path,
      value: e.value,
      code: e.code
    })
  ).then((response) => {
    if (logger) console.log(e);
    res.status(response.statusCode).send(response);
  });
