import signup from '../../providers/authentication/singup.provider';

export default (user) => Promise.resolve(user).then(signup);
