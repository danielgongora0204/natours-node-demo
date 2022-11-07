import rateLimit from 'express-rate-limit';
import { maxRate } from '../constants/server';
import { hoursToMillis } from '../utils/timeUtil';

export default rateLimit({
  max: maxRate,
  windowsMs: hoursToMillis(),
  message: 'To many requests from this IP!'
});
