"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = function (action, body) {
    var opts = body && body.length > 0 ? { input: body } : {};
    return require('execa').shell(action, opts);
};
