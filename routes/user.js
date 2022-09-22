import express from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/user';
import { protect, restrict } from '../middlewares/endpointSecurity';

//Routes
const route = express.Router();

route.route('/').get(protect, getUsers);
route
  .route('/:id')
  .get(protect, getUser)
  .delete(protect, restrict('admin'), deleteUser);

export default route;
