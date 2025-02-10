"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (type, subject, start) {
    if (start === void 0) { start = new Date(); }
    return function (status, payload, end) {
        if (payload === void 0) { payload = null; }
        if (end === void 0) { end = new Date(); }
        return (__assign({ type: type, subject: subject, status: status, timing: end.getTime() - start.getTime() }, (payload && { payload: payload })));
    };
});
