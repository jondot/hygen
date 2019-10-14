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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inflection = __importStar(require("inflection"));
var changeCase = __importStar(require("change-case"));
// supports kebab-case to KebabCase
// @ts-ignore
inflection.undasherize = function (str) {
    return str
        .split(/[-_]/)
        .map(function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); })
        .join('');
};
exports.helpersResolver = function (config) {
    config.helpers = __assign(__assign({}, config.helpers), { capitalize: changeCase.ucFirst, inflection: inflection, changeCase: changeCase });
    return Promise.resolve(config);
};
exports.default = exports.helpersResolver;
