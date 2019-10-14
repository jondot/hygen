"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("../yargs");
var file_1 = require("../file");
var hooks_1 = require("../hooks");
/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */
var defaultsResolvers = require('./resolvers/defaults');
var moduleResolvers = require('./resolvers/module');
exports.configResolver = function (config) {
    var hooksResolver = hooks_1.createHooksResolver('postConfig');
    return defaultsResolvers(config)
        .then(file_1.fileResolver('configFiles'))
        .then(yargs_1.yargsResolver)
        .then(hooksResolver);
};
var resolver = {
    resolve: exports.configResolver,
    name: 'Modules ',
    hooks: ['postConfig'],
};
exports.default = resolver;
