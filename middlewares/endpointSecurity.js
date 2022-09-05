import { verifyToken } from '../utils/jwt';
import Response from '../constants/response';
import verifyUserToken from '../services/authentication/verifyUserToken.service';

const {
  unauthorized,
  Desc: { Unauthorized }
} = Response;

const checkHeader = (token) =>
  new Promise((resolve, reject) => {
    if (!token || !token.startsWith('Bearer') || !token.split(' ')[1])
      reject(unauthorized(null, Unauthorized));
    resolve(token.split(' ')[1]);
  });

const addUserToRequest = (req, user) =>
  new Promise((resolve) => {
    req.user = user;
    resolve();
  });

export default (req, res, next) =>
  checkHeader(req.headers.authorization)
    .then(verifyToken)
    .then(verifyUserToken)
    .then((user) => addUserToRequest(req, user))
    .then(() => {
      console.log(req);
    })
    .then(() => next())
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
