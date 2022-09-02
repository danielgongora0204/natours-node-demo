import express from 'express';
import {
  getUsers,
  postUser,
  getUser,
  patchUser,
  deleteUser
} from '../controllers/user';

//Routes
const route = express.Router();

route.route('/').get(getUsers).post(postUser);
route.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

export default route;
