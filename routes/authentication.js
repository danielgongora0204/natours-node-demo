import express from 'express';
import { login, signup, resetPassword } from '../controllers/authentication';

const route = express.Router();

route.route('/login').post(login);
route.route('/signup').post(signup);
route.route('/reset-password').patch(resetPassword);

export default route;
