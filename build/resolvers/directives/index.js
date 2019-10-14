"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directivesResolver = function (config) {
    // resolve preDirectives hooks
    // resolve postDirectives hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.directivesResolver,
    name: 'Directives Resolver',
    hooks: ['preDirectives', 'postDirectives'],
};
exports.default = exports.directivesResolver;
