import getTourStats from '../../providers/tour/getTourStats.provider';

export default (stats) => Promise.resolve(getTourStats(stats));
