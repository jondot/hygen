"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpModuleResolver = function (config) {
    // resolve preHelpmodule hooks
    // resolve postHelpmodule hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.helpModuleResolver,
    name: 'Helpmodule Resolver',
    hooks: ['preHelpmodule', 'postHelpmodule'],
};
exports.default = resolver;
