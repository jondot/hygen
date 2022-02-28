"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const inflection_1 = __importDefault(require("inflection"));
const change_case_1 = __importDefault(require("change-case"));
// supports kebab-case to KebabCase
inflection_1.default.undasherize = (str) => str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
const helpers = {
    capitalize(str) {
        const toBeCapitalized = String(str);
        return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1);
    },
    inflection: inflection_1.default,
    changeCase: change_case_1.default,
    path: path_1.default,
};
exports.default = helpers;
