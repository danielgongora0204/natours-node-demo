import { connectDB } from '../db/mongo';
import errorResponse from '../utils/errorResponse';

export default (_req, _res, next) =>
  connectDB()
    .then(() => {
      next();
    })
    .catch((e) => errorResponse(_res, e));
