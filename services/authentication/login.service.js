import login from '../../providers/authentication/login.provider';

export default (user) => Promise.resolve(login(user));
