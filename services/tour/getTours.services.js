import getTour from '../../providers/tour/getTours.provider';

export default (searchQuery, filter) =>
  Promise.resolve(getTour(searchQuery, filter));
