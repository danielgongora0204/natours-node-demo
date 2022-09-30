import model from '../../models/user';

export default (user) =>
  Promise.resolve(
    model.create({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      role: user.role
    })
  )
    .then((result) => {
      result.password = undefined;
      return result;
    })
    .catch((err) => {
      throw err;
    });
