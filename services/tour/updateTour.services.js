import updateTour from '../../providers/tour/updateTour.provider';

export default ({ body, params: { tourId } }) =>
  Promise.resolve(body).then(updateTour(tourId));
