import createTour from '../../providers/tour/createTour.provider';

export default (tour) => Promise.resolve(tour).then(createTour);
