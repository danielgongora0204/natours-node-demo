import model from '../../models/tour';

export default (id) =>
  Promise.resolve(model.findByIdAndDelete(id)).catch((err) => {
    throw err;
  });
