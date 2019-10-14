"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("../yargs"));
var logger_1 = require("./logger");
var helpModule_1 = require("./helpModule");
var hooks_1 = require("../hooks");
var tools_1 = require("./tools");
var helpers_1 = require("./helpers");
var utils_1 = require("../../utils");
exports.defaultsResolver = utils_1.createResolverChain([
    yargs_1.default,
    logger_1.loggerResolver,
    helpModule_1.helpModuleResolver,
    tools_1.toolsResolver,
    helpers_1.helpersResolver,
    hooks_1.createHooksResolver('postDefaults'),
]);
exports.default = exports.defaultsResolver;
