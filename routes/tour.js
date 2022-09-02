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
route.route('/top-five-cheapest').get(aliasTopFiveTours, getTours);
route.route('/difficulty-stats').get(difficultyStats, getTourStats);
route.route('/monthly-plan/:year').get(monthlyPlan, getTourStats);
route.route('/').get(protect, getTours).post(postTour);
route.route('/:id').get(getTour).patch(patchTour).delete(deleteTour);

export default route;
