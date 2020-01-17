"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../src/logger"));
exports.createPrompter = () => require('enquirer');
// folders default is ['.hygen.js']
// if folders begins with '/' or '~', assume it is an absolute(ish) path
// if folder begins with anything else, it is assumed to be a filename
//   from current direct
// @param {[string]} [files=['.hygen.js']] an array of files to reverse dir search for
// @param {string} [files=[process.cwd()]from the directory to start searching from
// @param {string} [to=path.parse(process.cwd()).root] a directory to stop searching at
// @param {object} [path=require('path')] a pathlike object supporting path.resolve & path.sep
// @return {[string]} an array of files that may be a config file to load
exports.reversePathsToWalk = ({ files, path, from, to }) => {
    const start = path.resolve(from || process.cwd());
    const stop = path.parse(path.resolve(to || start)).root;
    return files.reduce((all, file) => {
        // if file starts with ['/','~','../','./']
        if (file.match(/^(\.{1,2}\/|[/~])/)) {
            all.push(path.resolve(file));
            return all;
        }
        // file is a name to search directories for
        start
            .split(path.sep)
            .forEach((_, idx, arr) => {
            const filePath = arr.slice(0, idx + 1).join(path.sep) || '/';
            // {start: '/home/pstibbons/code/concerning/hex',stop: '/home/pstibbons'}
            // filePath = '/home/pstibbons/code'; stop.startsWith(filePath) === false
            // filePath = '/home/pstibbons'; stop.startsWith(filePath) === true
            if (stop.startsWith(filePath))
                return all;
            all.push(path.join(filePath, file));
        });
        return all;
    }, []).reverse();
};
exports.resolveTools = config => {
    config.tools = Object.assign({ prompter: exports.createPrompter, logger: new logger_1.default(config.io.consoleWrite), reversePathsToWalk: exports.reversePathsToWalk }, (config.tools || {}));
    return Promise.resolve(config);
};
//# sourceMappingURL=tools.js.map