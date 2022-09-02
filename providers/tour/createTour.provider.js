import model from '../../models/tour';

export default (tour) =>
  Promise.resolve(model.create(tour)).catch((err) => {
    throw err;
  });
