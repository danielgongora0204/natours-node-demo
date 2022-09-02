import bcryptjs from 'bcryptjs';
import { bcryptCost } from '../constants/security';

export const hash = (password) =>
  Promise.resolve(password).then((pass) => bcryptjs.hash(pass, bcryptCost));

export const auth = (password, hashPassword) =>
  bcryptjs.compare(password, hashPassword);
