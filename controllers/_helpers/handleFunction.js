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
        const cookieOpt = {
          expires: new Date(Date.now() + daysToMillis(jwtCookieExpiration)),
          httpOnly: true
        };
        if (environment === 'production') cookieOpt.secure = true;
        res.cookie('jwt', result.cookie, cookieOpt);
      }
      res.status(result.statusCode).send(result);
    })
    .catch((err) => errorResponse(res, err, false, err.statusCode));
};
