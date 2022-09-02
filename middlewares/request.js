import filterFields from '../constants/request';

export const replaceMongoOperators = (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt|eq|ne|nin)\b/g,
    (str) => `$${str}`
  );
  req.query = JSON.parse(queryStr);
  next();
};

export const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

export const queryFilter = (req, res, next) => {
  req.filter = {};
  filterFields.forEach((field) => {
    if (req.query[field]) {
      req.filter[field] = req.query[field].split(',').join(' ');
      if (['limit', 'page'].indexOf(field) > -1) {
        req.filter[field] *= 1;
      }
    }
  });
  next();
};

export const querySearch = (req, res, next) => {
  filterFields.forEach((field) => delete req.query[field]);
  next();
};
