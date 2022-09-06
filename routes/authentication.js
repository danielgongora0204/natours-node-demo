import express from 'express';
import {
  login,
  signup,
  resetPassword,
  forgotPassword
} from '../controllers/authentication';

const route = express.Router();

route.route('/login').post(login);
route.route('/signup').post(signup);
route.route('/reset-password').post(resetPassword);
route.route('/forgot-password').post(forgotPassword);

export default route;
