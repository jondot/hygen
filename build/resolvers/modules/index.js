"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("resolvers/hooks");
var file_1 = require("resolvers/file");
var yargs_1 = __importDefault(require("../yargs"));
// TODO why won't ../hygen work for import?
exports.modulesResolver = function (config) {
    return hooks_1.createHooksResolver('preModule')(config)
        .then(function (config) {
        var modules = config.modules.map(function (module) {
            if (typeof module === 'string') {
                return file_1.fileResolver(module);
            }
            else
                return Promise.resolve(module);
        });
        return Promise.all(modules);
    })
        // .catch() // fail to load module
        .then(function (modules) {
        return mergeResolver(modules)();
    })
        .then(yargs_1.default)
        .then(hooks_1.createHooksResolver('postModule'));
};
var resolver = {
    resolver: exports.modulesResolver,
    name: 'Modules Resolver',
    hooks: ['preModule', 'postModule'],
};
exports.default = resolver;
