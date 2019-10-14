"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
exports.createHooksResolver = function (hook) {
    return function (config) {
        if (config.hooks && config.hooks[hook])
            return utils_1.createResolverChain(config.hooks[hook])(config);
        else
            return Promise.resolve(config);
    };
};
