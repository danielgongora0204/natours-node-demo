import errorResponse from '../../utils/errorResponse';

export default (fn, res, req) => {
  let maybePromise = req ? fn(req) : fn();
  if (typeof maybePromise?.then !== 'function')
    maybePromise = Promise.resolve(maybePromise);
  return maybePromise
    .then((result) => res.status(result.statusCode).send(result))
    .catch((err) => errorResponse(res, err, false, err.statusCode));
};
