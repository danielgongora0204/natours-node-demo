import validateUser from '../../providers/authentication/verifyUserToken.provider';

export default (decoded) => Promise.resolve(validateUser(decoded));
