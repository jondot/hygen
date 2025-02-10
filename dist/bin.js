#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("./logger"));
var index_1 = require("./index");
var defaultTemplates = path_1.default.join(__dirname, '../src/templates');
(0, index_1.runner)(process.argv.slice(2), {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new logger_1.default(console.log.bind(console)), // eslint-disable-line no-console
    debug: !!process.env.DEBUG,
    exec: function (action, body) {
        var opts = body && body.length > 0 ? { input: body } : {};
        return require('execa').command(action, __assign(__assign({}, opts), { shell: true })); // eslint-disable-line @typescript-eslint/no-var-requires
    },
    createPrompter: function () { return require('enquirer'); },
}).then(function (_a) {
    var success = _a.success;
    return process.exit(success ? 0 : 1);
});
