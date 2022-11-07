const split = (thing) => {
  if (typeof thing === 'string') {
    return thing.split('/');
  }
  if (thing.fast_slash) {
    return '';
  }
  const match = thing
    .toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
  return match
    ? match[1].replace(/\\(.)/g, '$1').split('/')
    : `<complex:${thing.toString()}>`;
};

const pathCreation = (path, layer) => {
  if (layer.route) {
    layer.route.stack.forEach(
      pathCreation.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(
      pathCreation.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    if (path[0] !== '*') {
      return `${layer.method.toUpperCase()} ${path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join('/')}`;
    }
    return null;
  }
};
