import handleFunction from './_helpers/handleFunction';
import Response from '../constants/response';
import loginService from '../services/authentication/login.service';
import signupService from '../services/authentication/signup.service';
import forgotPasswordService from '../services/authentication/passwordForgot.service';
import resetPasswordService from '../services/authentication/passwordReset.service';

const { created, ok, nocontent } = Response;

export const login = (req, res) =>
  handleFunction(
    (request) =>
      loginService({
        email: request.body.email,
        password: request.body.password
      }).then(ok),
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
    (request) =>
      forgotPasswordService({
        email: request.body.email,
        protocol: request.protocol,
        host: request.get('host')
      }).then(nocontent),
    res,
    req
  );

export const resetPassword = (req, res) =>
  handleFunction(
    (request) =>
      resetPasswordService({
        body: request.body,
        params: { token: request.params.token }
      }).then(nocontent),
    res,
    req
  );
