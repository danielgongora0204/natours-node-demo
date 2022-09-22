import model from '../../models/user';

export default (userId) => (body) =>
  Promise.resolve(
    model.findByIdAndUpdate(
      userId,
      {
        name: body.name || undefined,
        surname: body.surname || undefined,
        photo: body.photo || undefined
      },
      {
        new: true,
        runValidators: true
      }
    )
  ).catch((err) => {
    throw err;
  });
