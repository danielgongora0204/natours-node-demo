import model from '../../models/user';

export default (user) =>
  Promise.resolve(
    model.create({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm
    })
  ).catch((err) => {
    throw err;
  });
