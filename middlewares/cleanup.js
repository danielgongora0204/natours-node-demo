import { disconnectDB } from '../db/mongo';

const afterResponse = () =>
  disconnectDB().then((err) => {
    console.log('mongoose:close', err);
  });

export default (req, res, next) => {
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
};
