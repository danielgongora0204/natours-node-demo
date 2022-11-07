import errorResponse from '../../utils/errorResponse';
import { jwtCookieExpiration } from '../../constants/security';
import { daysToMillis } from '../../utils/timeUtil';
import { environment } from '../../constants/server';

export default (fn, res, req) => {
  let maybePromise = req ? fn(req) : fn();
  if (typeof maybePromise?.then !== 'function')
    maybePromise = Promise.resolve(maybePromise);
  return maybePromise
    .then((result) => {
      if (result.cookie) {
        res.cookie('jwt', result.cookie, {
          expires: new Date(Date.now() + daysToMillis(jwtCookieExpiration)),
          httpOnly: true,
          secure: environment === 'production'
        });
      }
      res.status(result.statusCode).send(result);
    })
    .catch((err) => errorResponse(res, err, false, err.statusCode));
};
