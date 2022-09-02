import handleFunction from './_helpers/handleFunction';
import Response from '../constants/response';
import getUsersService from '../services/user/getUsers.service';

const { ok } = Response;

//Handlers
export const getUsers = (req, res) =>
  handleFunction(
    (request) => getUsersService(request.query, request.filter).then(ok),
    res,
    req
  );

export const postUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented.',
    data: null
  });

export const getUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented.',
    data: null
  });

export const patchUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented.',
    data: null
  });

export const deleteUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented.',
    data: null
  });
