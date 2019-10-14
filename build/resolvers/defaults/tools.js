"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsResolver = function (config) {
    // resolve preToolsresolver hooks
    // resolve postToolsresolver hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.toolsResolver,
    name: 'Toolsresolver Resolver',
    hooks: ['preToolsresolver', 'postToolsresolver'],
};
exports.default = resolver;
