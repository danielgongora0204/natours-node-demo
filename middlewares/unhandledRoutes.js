import Response from '../constants/response';

const { notFound } = Response;

export default (req, res, next) =>
  Promise.resolve(notFound(null)).then((response) =>
    res.status(response.statusCode).send(response)
  );
