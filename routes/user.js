import express from 'express';
import {
  getUsers,
  postUser,
  getUser,
  patchUser,
  deleteUser
} from '../controllers/user';
import protect from '../middlewares/endpointSecurity';

//Routes
const route = express.Router();

route.route('/').get(protect, getUsers).post(protect, postUser);
route
  .route('/:id')
  .get(protect, getUser)
  .patch(protect, patchUser)
  .delete(protect, deleteUser);

export default route;
