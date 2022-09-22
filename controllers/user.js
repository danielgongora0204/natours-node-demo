import handleFunction from './_helpers/handleFunction';
import Response from '../constants/response';
import getUserByService from '../services/user/getUserBy.service';
import getUsersService from '../services/user/getUsers.service';
import deleteUserService from '../services/user/deleteUser.service';

const { ok, nocontent } = Response;

//Handlers
export const getUsers = (req, res) =>
  handleFunction(
    (request) => getUsersService(request.query, request.filter).then(ok),
    res,
    req
  );

export const getUser = (req, res) =>
  handleFunction(
    (request) => getUserByService(request.params.id).then(ok),
    res,
    req
  );

export const deleteUser = (req, res) =>
  handleFunction(
    (request) => deleteUserService(request.params.id).then(nocontent),
    res,
    req
  );
