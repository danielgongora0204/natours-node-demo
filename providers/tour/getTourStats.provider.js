import model from '../../models/tour';

export default (stats) =>
  Promise.resolve(model.aggregate(stats)).catch((err) => {
    throw err;
  });
