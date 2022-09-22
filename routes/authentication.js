import express from 'express';
import {
  login,
  signup,
  resetPassword,
  forgotPassword,
  updatePassword,
  updateAccount,
  deleteAccount
} from '../controllers/authentication';
import { protect } from '../middlewares/endpointSecurity';

const route = express.Router();

route.route('/login').post(login);
route.route('/signup').post(signup);
route.route('/reset-password/:token').patch(resetPassword);
route.route('/forgot-password').post(forgotPassword);
route.route('/update-password').patch(protect, updatePassword);
route.route('/update-account').patch(protect, updateAccount);
route.route('/delete-account').patch(protect, deleteAccount);

export default route;
