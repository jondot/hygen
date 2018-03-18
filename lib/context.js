function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const L = require('lodash');

const inflection = require('inflection'); // supports kebab-case to KebabCase


inflection.undasherize = str => str.split(/[-_]/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');

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

const context = (locals, config) => {
  const localsWithDefaults = Object.assign({}, localsDefaults, locals);
  const configHelpers = config && config.helpers || {};
  return Object.assign(localsWithDefaults, capitalizedLocals(localsWithDefaults), {
    h: _extends({}, helpers, configHelpers)
  });
};

module.exports = context;