import getUserBy from '../../providers/user/getUserBy.provider';

export default (id) => Promise.resolve(getUserBy(id));
