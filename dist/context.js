"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inflection = require('inflection');
const changeCase = require('change-case');
const path = require('path');
const localsToCapitalize = ['name'];
const localsDefaults = {
    name: 'unnamed',
};
// supports kebab-case to KebabCase
inflection.undasherize = str => str
    .split(/[-_]/)
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
const helpers = {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    inflection,
    changeCase,
    path,
};
const doCapitalization = (hsh, [key, value]) => {
    hsh[key] = value;
    if (localsToCapitalize.includes(key))
        hsh[helpers.capitalize(key)] = helpers.capitalize(value);
    return hsh;
};
const capitalizedLocals = (locals) => Object.entries(locals).reduce(doCapitalization, {});
const context = (locals, config = {}) => {
    const localsWithDefaults = Object.assign(Object.assign(Object.assign({}, localsDefaults), config.localsDefaults), locals);
    const configHelpers = (config &&
        (typeof config.helpers === 'function'
            ? config.helpers(locals, config)
            : config.helpers)) ||
        {};
    return Object.assign(localsWithDefaults, capitalizedLocals(localsWithDefaults), {
        h: Object.assign(Object.assign({}, helpers), configHelpers),
    });
};
module.exports = context;
//# sourceMappingURL=context.js.map