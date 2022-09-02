import model from '../../models/tour';

export default (id) =>
  Promise.resolve(model.findById(id)).catch((err) => {
    throw err;
  });
