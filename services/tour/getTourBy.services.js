import getTourBy from '../../providers/tour/getTourBy.provider';

export default (id) => Promise.resolve(getTourBy(id));
