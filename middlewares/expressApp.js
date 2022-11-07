import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import limiter from './limiter';
import mongo from './mongo';
import { environment, maxJsonSize } from '../constants/server';
import cleanup from './cleanup';
import helmet from './helmet';
import mongoSanitizer from './mongoSanitizer';
import xss from './xss';
import hpp from './hpp';
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
    //Helmet Security Middleware
    .use(helmet)
    //MongoDB Middleware
    .use(mongo)
    //Middleware supported by the express library for logging
    .use(morgan(environment === 'development' ? 'dev' : 'combined'))
    //Middleware for Rate limiting
    .use('/api', limiter)
    //Middleware included in the express library that allows for json parsing
    .use(express.json({ limit: maxJsonSize }))
    //Middleware for query injection
    .use(mongoSanitizer)
    //Middleware to handle cross side scripting
    .use(xss)
    //Middleware to handle parameter pollution
    .use(hpp)
    //Middware to serve static files
    .use(express.static(`${__dirname}/../public`))
    //Special Request middlewares
    .use(replaceMongoOperators)
    .use(requestTime)
    .use(queryFilter)
    .use(querySearch);

  if (isOffline) expressMiddleware.use(cleanup);
  return expressMiddleware;
};

//.use(cleanup);
