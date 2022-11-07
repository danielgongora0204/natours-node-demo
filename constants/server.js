export const port = process.env.PORT || 3000;
export const maxRate = +process.env.EXPRESS_RATE_LIMIT || 100;
export const maxJsonSize = process.env.EXPRESS_JSON_LIMIT || '10kb';
export const environmentDefault = 'development';
export const environment = process.env.NODE_ENV || environmentDefault;
