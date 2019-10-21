
import { RunnerConfig } from "./types";

const inflection = require('inflection');
const changeCase = require('change-case');

// supports kebab-case to KebabCase
inflection.undasherize = str => str.split(/[-_]/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');

const helpers = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  inflection,
  changeCase
};

const doCapitalization = (hsh, [key, value]) => {
  hsh[key] = value;

  if (localsToCapitalize.includes(key)) hsh[helpers.capitalize(key)] = helpers.capitalize(value);

  return hsh;
};

const localsToCapitalize = ['name'];
const localsDefaults = {
  name: 'unnamed'
};

const capitalizedLocals = (locals: any) => Object.entries(locals).reduce(doCapitalization, {});

const context = (locals: any, config: RunnerConfig) => {
  const localsWithDefaults = Object.assign({}, localsDefaults, locals);
  const configHelpers = config && (typeof config.helpers === "function" ? config.helpers(locals, config) : config.helpers) || {};
  return Object.assign(localsWithDefaults, capitalizedLocals(localsWithDefaults), {
    h: { ...helpers, ...configHelpers }
  });
};
module.exports = context;