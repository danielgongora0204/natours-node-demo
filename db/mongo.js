import mongoose from 'mongoose';
import { cluster, pwd, host, database, uriSettings } from '../constants/mongo';

const shouldConnect = () => mongoose.connection.readyState === 1;

export const connectDB = () =>
  shouldConnect()
    ? Promise.resolve()
    : Promise.resolve(
        mongoose.connect(`${cluster}${pwd}${host}${database}${uriSettings}`, {
          maxPoolSize: 3,
          wtimeoutMS: 2500
        })
      );

export const disconnectDB = () => mongoose.disconnect().then((err) => err);
