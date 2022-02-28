"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const localsToCapitalize = ['name'];
const localsDefaults = {
    name: 'unnamed',
};
const doCapitalization = (hsh, [key, value]) => {
    hsh[key] = value;
    if (localsToCapitalize.includes(key))
        hsh[helpers_1.default.capitalize(key)] = helpers_1.default.capitalize(value);
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
        h: Object.assign(Object.assign({}, helpers_1.default), configHelpers),
    });
};
exports.default = context;
