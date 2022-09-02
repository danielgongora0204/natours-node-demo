export default (obj) =>
  Object.values(obj).some((el) => el === null || el === undefined || el === '');
