"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var newline = function (string) {
    var newlines = string.match(/(?:\r?\n)/g) || [];
    if (newlines.length === 0) {
        return os_1.EOL;
    }
    var crlf = newlines.filter(function (newline) { return newline === '\r\n'; }).length;
    var lf = newlines.length - crlf;
    return crlf > lf ? '\r\n' : '\n';
};
exports.default = newline;
