import filterFields from '../constants/request';
import errorResponse from '../utils/errorResponse';

export const replaceMongoOperators = (req, res, next) =>
  Promise.resolve(JSON.stringify(req.query))
    .then((query) =>
      query.replace(/\b(gte|gt|lte|lt|eq|ne|nin)\b/g, (str) => `$${str}`)
    )
    .then((query) => {
      req.query = JSON.parse(query);
    })
    .then(() => next())
    .catch((err) => errorResponse(res, err, true));

export const requestTime = (req, res, next) =>
  new Promise((resolve) => {
    req.requestTime = new Date().toISOString();
    resolve();
  })
    .then(() => next())
    .catch((err) => errorResponse(res, err, true));

export const queryFilter = (req, res, next) =>
  new Promise((resolve) => {
    req.filter = {};
    resolve();
  })
    .then(() =>
      filterFields.forEach((field) => {
        if (req.query[field]) {
          req.filter[field] = req.query[field].split(',').join(' ');
          if (['limit', 'page'].indexOf(field) > -1) {
            req.filter[field] *= 1;
          }
        }
      })
    )
    .then(() => next())
    .catch((err) => errorResponse(res, err, true));

export const querySearch = (req, res, next) =>
  Promise.resolve(filterFields.forEach((field) => delete req.query[field]))
    .then(() => next())
    .catch((err) => errorResponse(res, err, true));
