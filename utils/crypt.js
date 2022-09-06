import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import {
  bcryptCost,
  cryptoTokenLength,
  cryptoTokenFormat,
  cryptoTokenHash
} from '../constants/security';

export const bcryptHash = (password) =>
  Promise.resolve(password).then((pass) => bcryptjs.hash(pass, bcryptCost));

export const auth = (password, hashPassword) =>
  bcryptjs.compare(password, hashPassword);

export const randomToken = () =>
  Promise.resolve(
    crypto.randomBytes(cryptoTokenLength).toString(cryptoTokenFormat)
  );

export const cryptoHash = (string) =>
  Promise.resolve(
    crypto.createHash(cryptoTokenHash).update(string).digest(cryptoTokenFormat)
  );
