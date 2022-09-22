import deleteUser from '../../providers/user/deleteUser.provider';

export default (id) => Promise.resolve(deleteUser(id));
