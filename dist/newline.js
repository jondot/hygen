"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const newline = (string) => {
    const newlines = string.match(/(?:\r?\n)/g) || [];
    if (newlines.length === 0) {
        return os_1.EOL;
    }
    const crlf = newlines.filter((newline) => newline === '\r\n').length;
    const lf = newlines.length - crlf;
    return crlf > lf ? '\r\n' : '\n';
};
exports.default = newline;
