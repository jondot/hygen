"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsResolver = function (config) {
    // resolve preParamsHooks
    // resolve paramsHooks
    // resolve
    // resolve postParams hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.paramsResolver,
    name: 'Params Resolver',
    hooks: ['preParams', 'postParams'],
};
exports.default = resolver;
