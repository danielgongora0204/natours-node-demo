import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongo from './mongo';
import { environment } from '../constants/server';
import cleanup from './cleanup';
import {
  replaceMongoOperators,
  requestTime,
  queryFilter,
  querySearch
} from './request';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isOffline = process.env.IS_OFFLINE;

export default () => {
  const expressMiddleware = express()
    //MongoDB Middleware
    .use(mongo)
    //Middleware supported by the express library
    .use(morgan(environment === 'development' ? 'dev' : 'combined'))
    //Middle ware included in the express library
    .use(express.json())
    .use(express.static(`${__dirname}/../public`))
    //Request middleware
    .use(replaceMongoOperators)
    .use(requestTime)
    .use(queryFilter)
    .use(querySearch);

  if (isOffline) expressMiddleware.use(cleanup);
  return expressMiddleware;
};

//.use(cleanup);
