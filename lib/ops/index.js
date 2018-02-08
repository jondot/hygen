const add = require('./add');

const inject = require('./inject');

const shell = require('./shell');

const resolve = attributes => {
  const ops = [];

  if (attributes.to && !attributes.inject) {
    ops.push(add);
  }

  if (attributes.to && attributes.inject) {
    ops.push(inject);
  }

  if (attributes.sh) {
    ops.push(shell);
  }

  return ops;
};

module.exports = resolve;