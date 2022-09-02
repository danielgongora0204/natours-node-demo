import handleFunction from './_helpers/handleFunction';
import Response from '../constants/response';
import getToursService from '../services/tour/getTours.services';
import getTourByService from '../services/tour/getTourBy.services';
import createTourService from '../services/tour/createTour.services';
import updateTourProvider from '../services/tour/updateTour.services';
import deleteTourProvider from '../services/tour/deleteTour.services';
import getTourStatsService from '../services/tour/getTourStats.services';

const { created, ok, nocontent } = Response;

export const aliasTopFiveTours = (req, res, next) => {
  req.filter.limit = '5';
  req.filter.sort = '-ratingsAverage price';
  req.filter.fields = 'name price ratingsAverage summary difficulty';
  next();
};

export const difficultyStats = (req, res, next) => {
  req.stats = [
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    /*{
      $match: { _id: { $ne: 'EASY' } }
    }*/
  ];
  next();
};

export const monthlyPlan = (req, res, next) => {
  req.stats = [
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${req.params.year}-01-01`),
          $lte: new Date(`${req.params.year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: {
          $month: '$startDates'
        },
        numTourStart: {
          $sum: 1
        },
        tours: {
          $push: '$name'
        }
      }
    },
    {
      $addFields: {
        month: '$_id'
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTourStart: -1 }
    },
    {
      $limit: 12
    }
  ];
  next();
};

export const getTours = (req, res) =>
  handleFunction(
    (request) => getToursService(request.query, request.filter).then(ok),
    res,
    req
  );

export const postTour = (req, res) =>
  handleFunction(
    (request) => createTourService(request.body).then(created),
    res,
    req
  );

export const getTour = (req, res) =>
  handleFunction(
    (request) => getTourByService(request.params.id).then(ok),
    res,
    req
  );

export const patchTour = (req, res) =>
  handleFunction(
    (request) =>
      updateTourProvider({
        body: request.body,
        params: { tourId: request.params.id }
      }).then(ok),
    res,
    req
  );

export const deleteTour = (req, res) =>
  handleFunction(
    (request) => deleteTourProvider(request.params.id).then(nocontent),
    res,
    req
  );

export const getTourStats = (req, res) =>
  handleFunction(() => getTourStatsService(req.stats).then(ok), res, req);
