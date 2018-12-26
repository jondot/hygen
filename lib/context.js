"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const L = require('lodash');

const inflection = require('inflection');

const changeCase = require('change-case'); // supports kebab-case to KebabCase


inflection.undasherize = str => str.split(/[-_]/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');

const helpers = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },

  inflection,
  changeCase
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
    h: _objectSpread({}, helpers, configHelpers)
  });
};

module.exports = context;