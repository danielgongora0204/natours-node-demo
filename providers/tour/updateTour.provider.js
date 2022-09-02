import model from '../../models/tour';

export default (tourId) => (body) =>
  Promise.resolve(
    model.findByIdAndUpdate(tourId, body, {
      new: true,
      runValidators: true
    })
  ).catch((err) => {
    throw err;
  });
