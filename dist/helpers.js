"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var inflection_1 = __importDefault(require("inflection"));
var change_case_1 = __importDefault(require("change-case"));
// supports kebab-case to KebabCase
inflection_1.default.undasherize = function (str) {
    return str
        .split(/[-_]/)
        .map(function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); })
        .join('');
};
var helpers = {
    capitalize: function (str) {
        var toBeCapitalized = String(str);
        return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1);
    },
    inflection: inflection_1.default,
    changeCase: change_case_1.default,
    path: path_1.default,
};
exports.default = helpers;
