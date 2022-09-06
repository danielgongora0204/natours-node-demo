import { verifyToken } from '../utils/jwt';
import Response from '../constants/response';
import verifyUserToken from '../services/authentication/verifyUserToken.service';

const {
  unauthorized,
  Codes: { Forbidden },
  Desc: { Unauthorized, Permission }
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

const checkRolePermission = (roles, userRole) =>
  new Promise((resolve, reject) => {
    if (!roles.includes(userRole)) {
      reject(unauthorized(null, Permission, Forbidden));
    }
    resolve();
  });

export const protect = (req, res, next) =>
  checkHeader(req.headers.authorization)
    .then(verifyToken)
    .then(verifyUserToken)
    .then((user) => addUserToRequest(req, user))
    .then(() => next())
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });

export const restrict =
  (...roles) =>
  (req, res, next) =>
    checkRolePermission(roles, req.user.role)
      .then(() => next())
      .catch((err) => {
        res.status(err.statusCode).send(err);
      });
