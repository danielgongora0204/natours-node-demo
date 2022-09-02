import model from '../../models/user';

export default (id) =>
  Promise.resolve(model.findById(id)).catch((err) => {
    throw err;
  });
