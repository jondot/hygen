"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __importDefault(require("./helpers"));
var localsToCapitalize = ['name'];
var localsToPluralize = ['name'];
var localsDefaults = {
    name: 'unnamed',
};
var processLocals = function (hsh, _a) {
    var key = _a[0], value = _a[1];
    hsh[key] = value;
    if (localsToCapitalize.includes(key)) {
        hsh[helpers_1.default.capitalize(key)] = helpers_1.default.capitalize(value);
    }
    if (localsToPluralize.includes(key)) {
        hsh[helpers_1.default.inflection.pluralize(key)] = helpers_1.default.inflection.pluralize(value);
        hsh[helpers_1.default.capitalize(helpers_1.default.inflection.pluralize(key))] = helpers_1.default.capitalize(helpers_1.default.inflection.pluralize(value));
    }
    return hsh;
};
var processedLocals = function (locals) {
    return Object.entries(locals).reduce(processLocals, {});
};
var context = function (locals, config) {
    if (config === void 0) { config = {}; }
    var localsWithDefaults = __assign(__assign(__assign({}, localsDefaults), config.localsDefaults), locals);
    var configHelpers = (config &&
        (typeof config.helpers === 'function'
            ? config.helpers(locals, config)
            : config.helpers)) ||
        {};
    return Object.assign(localsWithDefaults, processedLocals(localsWithDefaults), {
        h: __assign(__assign({}, helpers_1.default), configHelpers),
    });
};
exports.default = context;
