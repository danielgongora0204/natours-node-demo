import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { jwtSecret, jwtExpiration } from '../constants/security';
import Response from '../constants/response';

const {
  unauthorized,
  Desc: { Unauthorized }
} = Response;

export const createToken = (data) => ({
  token: jwt.sign({ id: data._id }, jwtSecret, {
    expiresIn: jwtExpiration
  })
});

export const verifyToken = (token) =>
  promisify(jwt.verify)(token, jwtSecret).catch((err) => {
    throw unauthorized(err.data ?? err.message, Unauthorized);
  });
