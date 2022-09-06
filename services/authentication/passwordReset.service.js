import resetPassword from '../../providers/authentication/passwordReset.provider';

export default (email) => Promise.resolve(resetPassword(email));
