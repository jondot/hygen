"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileResolver = function (config) {
    // resolve preFile hooks
    // resolve postFile hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.fileResolver,
    name: 'File Resolver',
    hooks: ['preFile', 'postFile'],
};
exports.default = resolver;
