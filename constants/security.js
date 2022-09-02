export const bcryptCost = +process.env.BCRYPT_COST || 12;
export const jwtSecret =
  process.env.JWT_SECRET || 'this-is-an-ultra-long-secret-sh';
export const jwtExpiration = process.env.JWT_EXPIRATION || '10d';
