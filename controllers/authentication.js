import handleFunction from './_helpers/handleFunction';
import Response from '../constants/response';
import loginService from '../services/authentication/login.service';
import signupService from '../services/authentication/signup.service';
import forgotPasswordService from '../services/authentication/passwordForgot.service';

const { created, ok } = Response;

export const login = (req, res) =>
  handleFunction(
    (request) =>
      loginService({ email: req.body.email, password: req.body.password }).then(
        ok
      ),
    res,
    req
  );

export const signup = (req, res) =>
  handleFunction(
    (request) => signupService(request.body).then(created),
    res,
    req
  );

export const forgotPassword = (req, res) =>
  handleFunction(
    (request) => forgotPasswordService(req.body.email).then(ok),
    res,
    req
  );

export const resetPassword = (req, res) =>
  handleFunction((request) => Promise.resolve('Hello').then(ok), res, req);
