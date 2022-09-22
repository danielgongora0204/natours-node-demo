import model from '../../models/user';

export default (id) =>
  Promise.resolve(model.findByIdAndDelete(id)).catch((err) => {
    throw err;
  });
