import forgotPassword from '../../providers/authentication/passwordForgot.provider';

export default (resetRequest) => Promise.resolve(forgotPassword(resetRequest));
