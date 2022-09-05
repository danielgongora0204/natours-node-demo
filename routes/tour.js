import express from 'express';
import {
  getTours,
  postTour,
  getTour,
  patchTour,
  deleteTour,
  getTourStats,
  aliasTopFiveTours,
  difficultyStats,
  monthlyPlan
} from '../controllers/tour';
import protect from '../middlewares/endpointSecurity';
//import { idValidate, tourValidate } from '../functions/_validators/tour';

//Routes
const route = express.Router();

//Middleware validators
//route.param('id', idValidate);
//route.route('/').get(getTours).post(tourValidate, postTour);

//Routes
route.route('/top-five-cheapest').get(protect, aliasTopFiveTours, getTours);
route.route('/difficulty-stats').get(protect, difficultyStats, getTourStats);
route.route('/monthly-plan/:year').get(protect, monthlyPlan, getTourStats);
route
  .route('/')
  .get(protect, getTours) // restrictTo('admin'),
  .post(protect, postTour);
route
  .route('/:id')
  .get(protect, getTour)
  .patch(protect, patchTour)
  .delete(protect, deleteTour);

export default route;
