import forgotPassword from '../../providers/authentication/passwordForgot.provider';

export default (email) => Promise.resolve(forgotPassword(email));
