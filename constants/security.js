export const bcryptCost = +process.env.BCRYPT_COST || 12;
export const cryptoTokenLength = +process.env.CRYPTO_TOKEN_LENGTH || 32;
export const cryptoTokenFormat = process.env.CRYPTO_TOKEN_FORMAT || 'hex';
export const cryptoTokenHash = process.env.CRYPTO_TOKEN_HASH || 'sha256';
export const cryptoTokenExpiration =
  +process.env.CRYPTO_TOKEN_EXPIRATION || 600000;
export const jwtSecret =
  process.env.JWT_SECRET || 'this-is-an-ultra-long-secret-sh';
export const jwtExpiration = process.env.JWT_EXPIRATION || '10d';
export const jwtCookieExpiration = +process.env.JWT_COOKIE_EXPIRATION || 10;
