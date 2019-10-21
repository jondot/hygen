#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
const index_1 = require("./index");
const defaultTemplates = path_1.default.join(__dirname, '../src/templates');
index_1.runner(process.argv.slice(2), {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new logger_1.default(console.log.bind(console)),
    debug: !!process.env.DEBUG,
    exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {};
        return require('execa').shell(action, opts);
    },
    createPrompter: () => require('enquirer'),
});
//# sourceMappingURL=bin.js.map