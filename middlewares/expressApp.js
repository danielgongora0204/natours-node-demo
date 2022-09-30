import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rateLimit from 'express-rate-limit';
import mongo from './mongo';
import { environment, maxRate } from '../constants/server';
import cleanup from './cleanup';
import {
  replaceMongoOperators,
  requestTime,
  queryFilter,
  querySearch
} from './request';
import { hoursToMillis } from '../utils/timeUtil';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isOffline = process.env.IS_OFFLINE;

export default () => {
  const expressMiddleware = express()
    //MongoDB Middleware
    .use(mongo)
    //Middleware supported by the express library
    .use(morgan(environment === 'development' ? 'dev' : 'combined'))
    //Rate limiter
    .use(
      '/api',
      rateLimit({
        max: maxRate,
        windowsMs: hoursToMillis(),
        message: 'To many requests from this IP.'
      })
    )
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
