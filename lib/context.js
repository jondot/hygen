const L = require('lodash');

const inflection = require('inflection');

const helpers = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },

  inflection
};
const localsToCapitalize = ['name'];
const localsDefaults = {
  name: 'unnamed'
};

const capitalizedLocals = locals => L.mapValues(L.mapKeys(L.pick(locals, localsToCapitalize), (v, k) => helpers.capitalize(k)), v => helpers.capitalize(v));

const context = locals => {
  const localsWithDefaults = Object.assign({}, localsDefaults, locals);
  return Object.assign(localsWithDefaults, capitalizedLocals(localsWithDefaults), {
    h: helpers
  });
};

module.exports = context;