"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inflection_1 = __importDefault(require("inflection"));
const change_case_1 = __importDefault(require("change-case"));
const path_1 = __importDefault(require("path"));
const localsToCapitalize = ['name'];
const localsDefaults = {
    name: 'unnamed',
};
// supports kebab-case to KebabCase
inflection_1.default.undasherize = (str) => str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
const helpers = {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    inflection: inflection_1.default,
    changeCase: change_case_1.default,
    path: path_1.default,
};
const doCapitalization = (hsh, [key, value]) => {
    const newHsh = Object.assign({}, hsh);
    newHsh[key] = value;
    if (localsToCapitalize.includes(key))
        newHsh[helpers.capitalize(key)] = helpers.capitalize(value);
    return newHsh;
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
exports.default = context;
//# sourceMappingURL=context.js.map