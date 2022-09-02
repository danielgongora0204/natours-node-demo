import model from '../../models/user';

export default (userId) => (password) =>
  Promise.resolve(
    model.findByIdAndUpdate(
      userId,
      { password: password },
      {
        new: true,
        runValidators: true
      }
    )
  ).catch((err) => {
    throw err;
  });
