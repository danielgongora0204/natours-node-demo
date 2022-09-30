export const port = process.env.PORT || 3000;
export const maxRate = +process.env.EXPRESS_RATE_LIMIT || 100;
export const environmentDefault = 'development';
export const environment = process.env.NODE_ENV || environmentDefault;
