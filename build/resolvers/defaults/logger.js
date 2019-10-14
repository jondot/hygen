"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../hooks");
var yargs_1 = __importDefault(require("../yargs"));
exports.loggerResolver = function (config) {
    hooks_1.createHooksResolver('preLogger')(config)
        .then(mergeLogModule)
        .then(yargs_1.default)
        .then(setupLogger)
        .then(hooks_1.createHooksResolver('postLogger'));
    // resolve preLogger hooks
    // resolve postLogger hooks
    return Promise.resolve(config);
};
exports.default = exports.loggerResolver;
